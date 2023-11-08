import { render, screen } from "@testing-library/react";

import ItemList from "./itemList";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { RemoveItemUseCase } from "../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../application/useCases/GetAllItems/GetAllItemsUseCase");
jest.mock("../../../../application/useCases/RemoveItem/RemoveItemUseCase");

describe("itemList - tests suite", () => {
  test("should show as many items exist", () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: () => [new Item("foo"), new Item("baa")],
      };
    });
    render(
      <ItemsProvider>
        <ItemList />
      </ItemsProvider>
    );

    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  test("should show a message when there are not items", () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: (): Item[] => [],
      };
    });
    render(
      <ItemsProvider>
        <ItemList />
      </ItemsProvider>
    );

    expect(screen.queryAllByRole("listitem").length).toBe(0);
    expect(screen.getByText("There are no items")).toBeInTheDocument();
  });

  test("clicking remove item button should remove the item and update the items list", async () => {
    const item = new Item("abc");
    const getAllItemsMock = jest.fn().mockImplementation((): Item[] => [item]);
    const removeItemMock = jest.fn();
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: getAllItemsMock,
      };
    });
    (RemoveItemUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: removeItemMock,
      };
    });

    render(
      <ItemsProvider>
        <ItemList />
      </ItemsProvider>
    );

    const removeButton = screen.getByRole("button", { name: "remove item" });

    await userEvent.click(removeButton);

    expect(getAllItemsMock).toBeCalledTimes(2);
    expect(removeItemMock).toBeCalledWith(item.id);
  });
});
