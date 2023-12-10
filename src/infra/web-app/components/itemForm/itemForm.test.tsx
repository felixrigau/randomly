import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ItemForm from "./itemForm";
import { ItemsProvider } from "../../contexts/Items/itemContext";

jest.mock("../../../../application/useCases/CreateItem/CreateItemUseCase");

describe("createForm - tests suite", () => {
  test("should have all needed element to input the item data", () => {
    render(
      <ItemsProvider>
        <ItemForm buttonText="click" onButtonClick={() => {}} />
      </ItemsProvider>
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Text")).toBeInTheDocument();
    expect(screen.getByLabelText("IsFixed")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should have the button disabled if title input is empty", async () => {
    render(
      <ItemsProvider>
        <ItemForm buttonText="click" onButtonClick={() => {}} />
      </ItemsProvider>
    );
    const button = screen.getByRole("button");
    const title = screen.getByLabelText("Title");

    expect(button).toBeDisabled();

    await userEvent.type(title, "foo");

    expect(button).toBeEnabled();
  });

  test("when button is clicked should call the onClick callback passing the item data as parameters", async () => {
    const handleClickMock = jest.fn();
    render(
      <ItemsProvider>
        <ItemForm buttonText="click" onButtonClick={handleClickMock} />
      </ItemsProvider>
    );

    const titleInput = screen.getByLabelText("Title");
    const textInput = screen.getByLabelText("Text");
    const fixedCheckbox = screen.getByLabelText("IsFixed");
    const button = screen.getByRole("button");

    const title = "foo",
      text = "baa";

    await userEvent.type(titleInput, title);
    await userEvent.type(textInput, text);
    await userEvent.click(fixedCheckbox);
    await userEvent.click(button);

    expect(handleClickMock).toBeCalledWith({
      title,
      text,
      isFixed: true,
    });
  });
});
