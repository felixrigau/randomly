import { PropsWithChildren } from "react";
import {
  StyledBackground,
  StyledContainer,
  StyledSideBar,
} from "./sideBar.styled";
import { useItemsContext } from "../../contexts/Items/useItemContext";

type SideBarType = {
  isOpen: boolean;
};

const SideBar = ({ children, isOpen }: PropsWithChildren<SideBarType>) => {
  const { toggleSideBar } = useItemsContext();

  return (
    <StyledSideBar>
      <StyledBackground $isOpen={isOpen} onClick={toggleSideBar} />
      <StyledContainer $isOpen={isOpen}>{children}</StyledContainer>
    </StyledSideBar>
  );
};

export default SideBar;
