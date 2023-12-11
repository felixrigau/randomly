// Dialog tag has not support in jsdom library yet.
// There is a open pull request waiting for the check of the library author
// https://github.com/jsdom/jsdom/pull/3403

import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { StyledHeader } from "../../pages/shared/styles.styled";
import { MenuButton } from "../menuButton/menuButton";
import SideBar from "../sideBar/sideBar";
import { StyledContainer, StyledMain } from "./layout.styled";
import MenuIcon from "@mui/icons-material/Menu";

export const Layout = ({ children }: PropsWithChildren) => {
  const { isSideBarOpen } = useItemsContext();
  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <div />
          <MenuButton>
            <MenuIcon />
          </MenuButton>
        </StyledHeader>
        <StyledMain>
          <SideBar isOpen={isSideBarOpen}>
            <Link to={"/items"}>Manage Items</Link>
          </SideBar>
          {children}
        </StyledMain>
      </StyledContainer>
    </>
  );
};
