import { render, screen } from "@testing-library/react";

import ShowItem from "./showItem";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { Item } from "../../../../application/model/Item";
import userEvent from "@testing-library/user-event";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";

jest.mock(
  "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase"
);

describe("itemList - tests suite", () => {
  test("should render a button", () => {
    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    expect(
      screen.getByRole("button", { name: "get next item" })
    ).toBeInTheDocument();
  });

  test("should get an element right when it is rendered and show it", () => {
    const item = new Item("Paul");
    const getItemRandomlyMock = jest.fn().mockReturnValue(item);
    (GetItemRandomlyUseCase as jest.Mock).mockImplementation(() => ({
      execute: getItemRandomlyMock,
    }));
    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    expect(getItemRandomlyMock).toBeCalled();
    expect(screen.getByText("Paul")).toBeInTheDocument();
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

    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );
    expect(screen.getByText("Paul")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "get next item" })
    );

    expect(getItemRandomlyMock).toBeCalled();
    expect(screen.getByText("Marie")).toBeInTheDocument();
  });

  test("should show a message when there is no more items to show", async () => {
    const getItemRandomlyMock = jest.fn().mockImplementation(() => {
      throw new NoMoreItemsError();
    });
    (GetItemRandomlyUseCase as jest.Mock).mockImplementation(() => ({
      execute: getItemRandomlyMock,
    }));

    render(
      <ItemsProvider>
        <ShowItem />
      </ItemsProvider>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "get next item" })
    );

    expect(screen.getByText("No more items to show")).toBeInTheDocument();
  });
});
