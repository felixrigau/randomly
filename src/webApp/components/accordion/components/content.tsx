import { PropsWithChildren } from "react";
import { StyledText } from "../accordion.styled";
import { useAccordionContext } from "../context/useAccordionContext";

export const Content = ({ children }: PropsWithChildren) => {
  const { isOpen } = useAccordionContext();
  return <StyledText isOpen={isOpen}>{children}</StyledText>;
};
