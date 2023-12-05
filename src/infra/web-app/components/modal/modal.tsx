import { createPortal } from "react-dom";
import { MouseEvent, PropsWithChildren, useEffect } from "react";
import { StyledBackground, StyledModal } from "./modal.styled";
import { modalContext } from "./context/modalContext";
import { Header } from "./components/header";

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
};

const { Provider } = modalContext;

const Modal = ({ children, isOpen, onClose }: PropsWithChildren<ModalType>) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isOpen]);

  const handleModalClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    isOpen &&
    createPortal(
      <Provider value={{ isOpen, onClose }}>
        <StyledBackground onClick={onClose} aria-label="background modal">
          <StyledModal onClick={handleModalClick}>{children}</StyledModal>
        </StyledBackground>
      </Provider>,
      document.getElementById("modal")
    )
  );
};

Modal.Header = Header;

export default Modal;
