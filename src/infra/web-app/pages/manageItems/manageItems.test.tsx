import { render, screen } from "@testing-library/react";

import { Item } from "../../../../application/model/Item";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { RemoveItemUseCase } from "../../../../application/useCases/itemCRUD/RemoveItem/RemoveItemUseCase";
import userEvent from "@testing-library/user-event";
import { RemoveVisitedItemIdUseCase } from "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { ManageItems } from "./manageItems";
import { MemoryRouter } from "react-router-dom";
import { GetOrderedItemsUseCase } from "../../../../application/useCases/GetOrderedItems/GetOrderedItemsUseCase";

jest.mock(
  "../../../../application/useCases/GetOrderedItems/GetOrderedItemsUseCase"
);
jest.mock(
  "../../../../application/useCases/itemCRUD/RemoveItem/RemoveItemUseCase"
);
jest.mock(
  "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase"
);

describe("itemList - tests suite", () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  });

  test("clicking remove item button should open the delete confirmation modal", async () => {
    const item = new Item("abc");
    const getOrderedItemsMock = jest
      .fn()
      .mockImplementation(async (): Promise<Item[]> => [item]);
    const removeItemMock = jest.fn().mockImplementation(async () => {});
    (GetOrderedItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: getOrderedItemsMock,
      };
    });
    (RemoveItemUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: removeItemMock,
      };
    });

    render(
      <ItemsProvider>
        <MemoryRouter>
          <ManageItems />
        </MemoryRouter>
      </ItemsProvider>
    );

    const openModalButton = await screen.findByRole("button", {
      name: "open remove modal",
    });

    await userEvent.click(openModalButton);

    const text = screen.getByText(/Are you sure about deleting/i);

    expect(text).toBeInTheDocument();
  });

  test("clicking the yes button on the delete confirmation modal should remove the item and update the items list", async () => {
    const item = new Item("abc");
    const getOrderedItemsMock = jest
      .fn()
      .mockImplementation(async (): Promise<Item[]> => [item]);
    const removeItemMock = jest.fn().mockImplementation(async () => {});
    (GetOrderedItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: getOrderedItemsMock,
      };
    });
    (RemoveItemUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: removeItemMock,
      };
    });

    render(
      <ItemsProvider>
        <MemoryRouter>
          <ManageItems />
        </MemoryRouter>
      </ItemsProvider>
    );

    const openModalButton = await screen.findByRole("button", {
      name: "open remove modal",
    });

    await userEvent.click(openModalButton);

    const yesButton = screen.getByRole("button", {
      name: "remove item",
    });

    await userEvent.click(yesButton);

    expect(getOrderedItemsMock).toBeCalledTimes(2);
    expect(removeItemMock).toBeCalledWith(item.id);
  });

  test("should remove item button clicking the delete button and then the confirm one", async () => {
    const item = new Item("abc");
    const removeVisitedItemIdMock = jest
      .fn()
      .mockImplementation(async () => {});
    (RemoveVisitedItemIdUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: removeVisitedItemIdMock,
      };
    });
    (GetOrderedItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: async (): Promise<Item[]> => [item],
      };
    });

    render(
      <ItemsProvider>
        <MemoryRouter>
          <ManageItems />
        </MemoryRouter>
      </ItemsProvider>
    );

    const openModalButton = await screen.findByRole("button", {
      name: "open remove modal",
    });

    await userEvent.click(openModalButton);

    const removeButton = screen.getByRole("button", {
      name: "remove item",
    });

    await userEvent.click(removeButton);

    expect(removeVisitedItemIdMock).toBeCalledWith(item.id);
  });
});
