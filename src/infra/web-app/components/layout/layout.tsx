// Dialog tag has not support in jsdom library yet.
// There is a open pull request waiting for the check of the library author
// https://github.com/jsdom/jsdom/pull/3403

import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { StyledHeader } from "../../pages/shared/styles.styled";
import { MenuButton } from "../menuButton/menuButton";
import SideBar from "../sideBar/sideBar";
import { StyledContainer, StyledMain } from "./layout.styled";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Layout = ({ children }: PropsWithChildren) => {
  const { isSideBarOpen } = useItemsContext();
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  console.log("location", location);
  return (
    <StyledContainer>
      <StyledHeader>
        {!isHome && (
          <Link to="/">
            <ArrowBackIcon />
          </Link>
        )}
        <div />
        {isHome && (
          <MenuButton>
            <MenuIcon />
          </MenuButton>
        )}
      </StyledHeader>
      <StyledMain>
        <SideBar isOpen={isSideBarOpen}>
          <Link to={"/items"}>Manage Items</Link>
        </SideBar>
        {children}
      </StyledMain>
    </StyledContainer>
  );
};
