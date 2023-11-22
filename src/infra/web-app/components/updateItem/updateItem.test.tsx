import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UpdateItem from "./updateItem";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import { UpdateItemUseCase } from "../../../../application/useCases/UpdateItem/UpdateItemUseCase";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { Item } from "../../../../application/model/Item";

jest.mock("../../../../application/useCases/UpdateItem/UpdateItemUseCase");
jest.mock("../../../../application/useCases/GetAllItems/GetAllItemsUseCase");

describe("updateItem - tests suite", () => {
  test("when button is clicked should create a new item", async () => {
    const getAllItemsMock = jest.fn().mockImplementation((): Item[] => []);
    (GetAllItemsUseCase as jest.Mock).mockImplementation(() => ({
      execute: getAllItemsMock,
    }));

    render(
      <ItemsProvider>
        <UpdateItem itemId="123" />
      </ItemsProvider>
    );

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const fixedCheckbox = screen.getByLabelText("IsFixed");
    const button = screen.getByRole("button");

    const title = "foo",
      description = "baa";

    await userEvent.type(titleInput, title);
    await userEvent.type(descriptionInput, description);
    await userEvent.click(fixedCheckbox);
    await userEvent.click(button);

    const updateItemMock = (UpdateItemUseCase as jest.Mock).mock.instances[0]
      .execute;

    expect(updateItemMock).toBeCalledWith(
      "123",
      expect.objectContaining({ title, text: description, isFixed: true })
    );
    expect(getAllItemsMock).toBeCalled();
  });
});
