import { render, screen } from "@testing-library/react";

import ShowItem from "./showItem";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { Item } from "../../../../application/model/Item";
import userEvent from "@testing-library/user-event";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";
import { useItemsContext } from "../../contexts/Items/useItemContext";

jest.mock(
  "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase"
);
jest.mock("../../contexts/Items/useItemContext");

describe("itemList - tests suite", () => {
  test("should render a button", () => {
    (useItemsContext as jest.Mock).mockImplementation(() => ({
      existItems: true,
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

  test("should get an element when button is clicked", async () => {
    const item = new Item("Paul"),
      item2 = new Item("Marie");
    const getItemRandomlyMock = jest
      .fn()
      .mockReturnValueOnce(item)
      .mockReturnValueOnce(item2);
    (GetItemRandomlyUseCase as jest.Mock).mockImplementation(() => ({
      execute: getItemRandomlyMock,
    }));

    (useItemsContext as jest.Mock).mockImplementation(() => ({
      existItems: true,
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

    expect(getItemRandomlyMock).toBeCalledTimes(2);
  });

  test("should show a message when there is no more items to show", async () => {
    const getItemRandomlyMock = jest.fn().mockImplementation(() => {
      throw new NoMoreItemsError();
    });
    (GetItemRandomlyUseCase as jest.Mock).mockImplementation(() => ({
      execute: getItemRandomlyMock,
    }));
    (useItemsContext as jest.Mock).mockImplementation(() => ({
      existItems: true,
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
    (useItemsContext as jest.Mock).mockImplementation(() => ({
      existItems: false,
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
