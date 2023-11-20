import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateForm from "./createItem";
import { CreateItemUseCase } from "../../../../application/useCases/CreateItem/CreateItemUseCase";
import { ItemsProvider } from "../../contexts/Items/itemContext";

jest.mock("../../../../application/useCases/CreateItem/CreateItemUseCase");

describe("createForm - tests suite", () => {
  test("when button is clicked should create a new item", async () => {
    render(
      <ItemsProvider>
        <CreateForm />
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

    const createItemMock = (CreateItemUseCase as jest.Mock).mock.instances[0]
      .execute;

    expect(createItemMock).toBeCalledWith(
      expect.objectContaining({ title, text: description, isFixed: true })
    );
  });
});
