import { createContext } from "react";

type ModalContextType = {
  isOpen: boolean;
  onClose: () => void;
};

export const modalContext = createContext<ModalContextType>({
  isOpen: false,
  onClose: () => {},
});
