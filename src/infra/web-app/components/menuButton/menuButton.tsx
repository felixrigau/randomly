import { PropsWithChildren } from "react";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { StyledButton } from "./menuButton.styled";

export const MenuButton = ({ children }: PropsWithChildren) => {
  const { toggleSideBar } = useItemsContext();

  return <StyledButton onClick={toggleSideBar}>{children}</StyledButton>;
};
