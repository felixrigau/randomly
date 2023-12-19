import { useContext } from "react";
import { accordionContext } from "./accordionContext";

export const useAccordionContext = () => {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error("Error: Accessing to accordionContext outside it.");
  }

  return context;
};
