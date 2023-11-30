import { render, screen } from "@testing-library/react";

import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { RemoveItemUseCase } from "../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import userEvent from "@testing-library/user-event";
import { RemoveVisitedItemIdUseCase } from "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { ManageItems } from "./manageItems";

jest.mock("../../../../application/useCases/GetAllItems/GetAllItemsUseCase");
jest.mock("../../../../application/useCases/RemoveItem/RemoveItemUseCase");
jest.mock(
  "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase"
);

describe("itemList - tests suite", () => {
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
        <ManageItems />
      </ItemsProvider>
    );

    const removeButton = screen.getByRole("button", { name: "remove item" });

    await userEvent.click(removeButton);

    expect(getAllItemsMock).toBeCalledTimes(2);
    expect(removeItemMock).toBeCalledWith(item.id);
  });

  test("clicking remove item button should remove the item id", async () => {
    const item = new Item("abc");
    const removeVisitedItemIdMock = jest.fn();
    (RemoveVisitedItemIdUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: removeVisitedItemIdMock,
      };
    });
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: (): Item[] => [item],
      };
    });

    render(
      <ItemsProvider>
        <ManageItems />
      </ItemsProvider>
    );

    const removeButton = screen.getByRole("button", { name: "remove item" });

    await userEvent.click(removeButton);

    expect(removeVisitedItemIdMock).toBeCalledWith(item.id);
  });
});