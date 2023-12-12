// Dialog tag has not support in jsdom library yet.
// There is a open pull request waiting for the check of the library author
// https://github.com/jsdom/jsdom/pull/3403

import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../sideBar/sideBar";
import { StyledContainer, StyledHeader, StyledMain } from "./layout.styled";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGoTo } from "../../hooks/useItemCRUD/useGoTo";

export const Layout = ({ children }: PropsWithChildren) => {
  const [isHome, setIsHome] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const { pathname } = useLocation();
  const { goToHome, goToItems } = useGoTo();

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  return (
    <StyledContainer>
      <StyledHeader>
        {!isHome && (
          <button aria-label="go home" onClick={goToHome}>
            <ArrowBackIcon />
          </button>
        )}
        <div />
        {isHome && (
          <button
            aria-label="handle menu"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <MenuIcon />
          </button>
        )}
      </StyledHeader>
      <StyledMain>
        {children}
        <SideBar isOpen={isSideBarOpen}>
          <button aria-label="go to items" onClick={goToItems}>
            Manage Items
          </button>
        </SideBar>
      </StyledMain>
    </StyledContainer>
  );
};
