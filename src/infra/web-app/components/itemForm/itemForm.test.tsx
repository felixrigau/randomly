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
        <ItemForm buttonText="click" onButtonClick={() => {}}>
          {(item) => <>{item.title}</>}
        </ItemForm>
      </ItemsProvider>
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Text")).toBeInTheDocument();
    expect(screen.getByLabelText("IsFixed")).toBeInTheDocument();
  });

  test("should render the input the input values as children", async () => {
    const handleClickMock = jest.fn();
    render(
      <ItemsProvider>
        <ItemForm buttonText="click" onButtonClick={handleClickMock}>
          {(item) => <>{JSON.stringify(item)}</>}
        </ItemForm>
      </ItemsProvider>
    );

    const titleInput = screen.getByLabelText("Title");
    const textInput = screen.getByLabelText("Text");
    const fixedCheckbox = screen.getByLabelText("IsFixed");

    const title = "foo",
      text = "baa";

    await userEvent.type(titleInput, title);
    await userEvent.type(textInput, text);
    await userEvent.click(fixedCheckbox);

    const itemData = screen.getByText(
      JSON.stringify({ title, text, isFixed: true })
    );

    expect(itemData).toBeInTheDocument();
  });
});
