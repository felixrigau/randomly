import { render, screen } from "@testing-library/react";

import ShowItem from "./showItem";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { Item } from "../../../../application/model/Item";
import userEvent from "@testing-library/user-event";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";

jest.mock("../../hooks/useItemCRUD/useItemCRUD");
jest.mock("../../contexts/Items/useItemContext");

describe("itemList - tests suite", () => {
  test("should render a button if it exists at least one item", () => {
    (useItemCRUD as jest.Mock).mockImplementation(() => ({
      getAll: () => [new Item("John")],
    }));
    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    expect(
      screen.getByRole("button", { name: "get next item" })
    ).toBeInTheDocument();
  });

  test("should not render a button if it does not exist a item", () => {
    (useItemCRUD as jest.Mock).mockImplementation(() => ({
      getAll: (): Item[] => [],
    }));
    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    expect(
      screen.queryByRole("button", { name: "get next item" })
    ).not.toBeInTheDocument();
  });

  test("should get an element when button is clicked", async () => {
    const item = new Item("Paul"),
      item2 = new Item("Marie"),
      item3 = new Item("Luke");

    const getRandomMock = jest
      .fn()
      .mockReturnValueOnce(item)
      .mockReturnValueOnce(item2);

    (useItemCRUD as jest.Mock).mockImplementation(() => ({
      getAll: () => [item3],
      getRandom: getRandomMock,
    }));

    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    const button = screen.getByRole("button", { name: "get next item" });

    await userEvent.click(button);

    expect(screen.getByText("Paul")).toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByText("Marie")).toBeInTheDocument();

    expect(getRandomMock).toBeCalledTimes(2);
  });

  test("should show a message when there is no more items to show", async () => {
    const getRandomMock = jest.fn().mockImplementation(() => {
      throw new NoMoreItemsError();
    });
    (useItemCRUD as jest.Mock).mockImplementation(() => ({
      getAll: () => [new Item("")],
      getRandom: getRandomMock,
    }));

    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "get next item" })
    );

    expect(
      screen.getByText("All items were visited today")
    ).toBeInTheDocument();
  });

  test("should show a message when there is no items", async () => {
    (useItemCRUD as jest.Mock).mockImplementation(() => ({
      getAll: (): Item[] => [],
    }));

    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    expect(
      screen.getByText("Create at least one item, please")
    ).toBeInTheDocument();
  });
});
