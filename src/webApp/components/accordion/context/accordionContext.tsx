import { Dispatch, SetStateAction, createContext } from "react";

type AccordionContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const accordionContext = createContext<AccordionContextType | null>(
  null
);
