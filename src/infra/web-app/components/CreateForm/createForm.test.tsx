import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateForm from "./createForm";

describe("createForm - tests suite", () => {
  test("should have a input to write the item title", () => {
    render(<CreateForm />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  test("should have a input to write the item description", () => {
    render(<CreateForm />);

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  test("should have a checkbox to mark the item as fixed", () => {
    render(<CreateForm />);

    expect(screen.getByLabelText("IsFixed")).toBeInTheDocument();
  });

  test("should have a button to create the new button", () => {
    render(<CreateForm />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should have the button disabled if title input is empty", async () => {
    render(<CreateForm />);
    const button = screen.getByRole("button");
    const title = screen.getByLabelText("Title");

    expect(button).toBeDisabled();

    await userEvent.type(title, "foo");

    expect(button).toBeEnabled();
  });
});
