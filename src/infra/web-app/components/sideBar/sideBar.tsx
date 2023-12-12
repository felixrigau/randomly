import { PropsWithChildren } from "react";
import { StyledContainer, StyledSideBar } from "./sideBar.styled";

type SideBarType = {
  isOpen: boolean;
};

const SideBar = ({ children, isOpen }: PropsWithChildren<SideBarType>) => {
  return (
    <StyledSideBar>
      <StyledContainer $isOpen={isOpen}>{children}</StyledContainer>
    </StyledSideBar>
  );
};

export default SideBar;
