import { MouseEvent, PropsWithChildren, useEffect, useRef } from "react";
import { Dialog } from "./modal.styled";

type ModalType = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: PropsWithChildren<ModalType>) => {
  const modalRef = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      console.log("modalRef.current", modalRef.current.close);
      modalRef.current.close?.();
      document.body.style.overflow = "scroll";
    }

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isOpen]);

  const handleClick = (event: MouseEvent) => {
    console.log(typeof event.target);
    if (modalRef.current.contains(event.target as Node)) return;
    modalRef.current.close();
  };

  return (
    <Dialog ref={modalRef} onClick={handleClick} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default Modal;
