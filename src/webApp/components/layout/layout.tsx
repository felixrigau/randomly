// Dialog tag has not support in jsdom library yet.
// There is a open pull request waiting for the check of the library author
// https://github.com/jsdom/jsdom/pull/3403

import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  StyledContainer,
  StyledFooter,
  StyledHeader,
  StyledMain,
} from "./layout.styled";
import { useGoTo } from "../../hooks/useGoTo";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";

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
      <StyledHeader>Rezando por</StyledHeader>
      <StyledMain>{children}</StyledMain>
      <StyledFooter>
        <button onClick={goToHome}>
          <HomeIcon />
        </button>
        <button onClick={goToItems}>
          <PeopleAltIcon />
        </button>
      </StyledFooter>
    </StyledContainer>
  );
};
