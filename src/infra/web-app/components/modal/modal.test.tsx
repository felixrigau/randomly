import { screen, render } from "@testing-library/react";
import Modal from "./modal";
import userEvent from "@testing-library/user-event";

describe("modal tests suite", () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
  });

  test("should show its content if it is open", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Hi</p>
      </Modal>
    );
    const text = screen.getByText("Hi");
    expect(text).toBeInTheDocument();
  });

  test("should not show its content if it is not open", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Hi</p>
      </Modal>
    );
    const text = screen.queryByText("Hi");
    expect(text).not.toBeInTheDocument();
  });

  test("should close the modal if the header close button is clicked", async () => {
    const handleCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleCloseMock}>
        <Modal.Header hasCloseButton>Title</Modal.Header>
      </Modal>
    );

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(handleCloseMock).toBeCalled();
  });

  test("should show the title of the header component", async () => {
    const handleCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleCloseMock}>
        <Modal.Header hasCloseButton>Title</Modal.Header>
      </Modal>
    );

    const title = screen.queryByText("Title");
    expect(title).toBeInTheDocument();
  });

  test("should close the modal if the user click the modal background layer", async () => {
    const handleCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleCloseMock}>
        <div>Say Hi!</div>
      </Modal>
    );

    const background = screen.queryByLabelText("background modal");

    await userEvent.click(background);

    expect(handleCloseMock).toBeCalled();
  });
});
