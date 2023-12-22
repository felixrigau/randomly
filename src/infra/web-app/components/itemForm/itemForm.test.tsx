import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemForm from "./itemForm";
import { ItemsProvider } from "../../contexts/Items/itemContext";
import userEvent from "@testing-library/user-event";

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

  test.only("should show the order input if the item is fixed", async () => {
    render(
      <ItemsProvider>
        <ItemForm />
      </ItemsProvider>
    );

    const isFixedCheckox = screen.getByLabelText("IsFixed");
    await userEvent.click(isFixedCheckox);

    expect(screen.getByLabelText("Order")).toBeInTheDocument();
  });
});
