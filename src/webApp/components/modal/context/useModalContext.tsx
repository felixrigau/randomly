import { useContext } from "react";
import { modalContext } from "./modalContext";

export const useModalContext = () => {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("Error: Accessing to modalContext outside it.");
  }

  return context;
};
