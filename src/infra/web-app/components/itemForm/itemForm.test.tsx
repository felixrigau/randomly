import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemForm from "./itemForm";
import { ItemsProvider } from "../../contexts/Items/itemContext";

jest.mock("../../../../application/useCases/CreateItem/CreateItemUseCase");

describe("createForm - tests suite", () => {
  test.only("should have all needed element to input the item data", () => {
    render(
      <ItemsProvider>
        <ItemForm />
      </ItemsProvider>
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Text")).toBeInTheDocument();
    expect(screen.getByLabelText("IsFixed")).toBeInTheDocument();
  });
});
