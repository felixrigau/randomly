import { PropsWithChildren } from "react";
import { useModalContext } from "../context/useModalContext";
import { StyledHeaderContainer } from "../modal.styled";
import CloseIcon from "@mui/icons-material/Close";

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
      {hasCloseButton && (
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </StyledHeaderContainer>
  );
};
