import { PropsWithChildren } from "react";
import { useModalContext } from "../context/useModalContext";
import { StyledHeaderContainer } from "../modal.styled";

type HeaderType = {
  hasCloseButton: boolean;
};

export const Header = ({
  children,
  hasCloseButton = false,
}: PropsWithChildren<HeaderType>) => {
  const { onClose } = useModalContext();
  return (
    <StyledHeaderContainer>
      {children}
      {hasCloseButton && <button onClick={onClose}>x</button>}
    </StyledHeaderContainer>
  );
};
