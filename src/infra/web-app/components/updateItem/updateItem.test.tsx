import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UpdateItem from "./updateItem";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { UpdateItemUseCase } from "../../../../application/useCases/UpdateItem/UpdateItemUseCase";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";
import { useItemsContext } from "../../contexts/Items/useItemContext";

jest.mock("../../contexts/Items/useItemContext");
jest.mock("../../../../application/useCases/UpdateItem/UpdateItemUseCase");
jest.mock("../../../../application/useCases/GetAllItems/GetAllItemsUseCase");

describe("updateItem - tests suite", () => {
  test("when button is clicked should update the modified data in the item", async () => {
    const getAllItemsMock = jest.fn().mockImplementation((): Item[] => []);
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => ({
      execute: getAllItemsMock,
    }));
    const item = new Item("abc");
    (useItemsContext as jest.Mock).mockImplementation(() => ({
      item,
      setItems: () => {},
    }));

    render(
      <ItemsProvider>
        <UpdateItem />
      </ItemsProvider>
    );

    const titleInput = screen.getByLabelText("Title");
    const button = screen.getByRole("button");

    const title = "foo";

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, title);
    await userEvent.click(button);

    const updateItemMock = (UpdateItemUseCase as jest.Mock).mock.instances[0]
      .execute;

    expect(updateItemMock).toBeCalledWith(
      item.id,
      expect.objectContaining({ title })
    );
    expect(getAllItemsMock).toBeCalled();
  });
});
