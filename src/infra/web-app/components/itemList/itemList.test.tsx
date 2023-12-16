import { render, screen } from "@testing-library/react";

import ItemList from "./itemList";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";
import { ItemsProvider } from "../../contexts/Items/itemContext";

jest.mock("../../../../application/useCases/GetAllItems/GetAllItemsUseCase");

describe("itemList - tests suite", () => {
  test("should show as many items exist", () => {
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => {
      return {
        execute: () => [new Item("foo"), new Item("baa")],
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
        <ItemList>
          {(items) =>
            items.map((item) => (
              <ItemList.Row key={item.id} title={item.title} />
            ))
          }
        </ItemList>
      </ItemsProvider>
    );

    expect(screen.queryAllByRole("listitem").length).toBe(0);
    expect(screen.getByText("There are no items")).toBeInTheDocument();
  });
});
