import { render, screen } from "@testing-library/react";

import ItemList from "./itemList";
import { GetAllItemsUseCase } from "../../../../application/useCases/itemCRUD/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";
import { ItemsProvider } from "../../contexts/Items/itemContext";

jest.mock(
  "../../../../application/useCases/itemCRUD/GetAllItems/GetAllItemsUseCase"
);

describe("itemList - tests suite", () => {
  test("should show as many items exist", async () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: async () => [new Item("foo"), new Item("baa")],
      };
    });

    render(
      <ItemsProvider>
        <ItemList>
          {(items) =>
            items.map((item) => (
              <ItemList.Row key={item.id} title={item.title} />
            ))
          }
        </ItemList>
      </ItemsProvider>
    );

    const itemList = await screen.findAllByRole("listitem");

    expect(itemList.length).toBe(2);
  });

  test("should show a message when there are not items", async () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: async (): Promise<Item[]> => [],
      };
    });
    render(
      <ItemsProvider>
        <ItemList>
          {(items) =>
            items.map((item) => (
              <ItemList.Row key={item.id} title={item.title} />
            ))
          }
        </ItemList>
      </ItemsProvider>
    );

    expect(await screen.queryAllByRole("listitem").length).toBe(0);
    expect(await screen.findByText("There are no items")).toBeInTheDocument();
  });
});
