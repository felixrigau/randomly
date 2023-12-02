import { MouseEvent, PropsWithChildren, useEffect } from "react";
import { StyledBackground, StyledModal } from "./modal.styled";

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
};

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
    isOpen && (
      <StyledBackground onClick={onClose}>
        <StyledModal onClick={handleModalClick}>{children}</StyledModal>
      </StyledBackground>
    )
  );
};

export default Modal;
