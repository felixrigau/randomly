import { render, screen } from "@testing-library/react";
import CreateForm from "./createForm";

describe("createForm - tests suite", () => {
  test("should have a input to write the item title", () => {
    render(<CreateForm />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
