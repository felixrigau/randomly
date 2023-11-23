import { PropsWithChildren } from "react";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { StyledButton } from "./menuButton.styled";

type ButtonType = {
  onClick: () => void;
};

export const Button = ({ children }: PropsWithChildren<ButtonType>) => {
  const { toggleSideBar } = useItemsContext();

  return <StyledButton onClick={toggleSideBar}>{children}</StyledButton>;
};
