import { PropsWithChildren } from "react";
import { Container } from "./sideBar.styled";

type SideBarType = {
  isOpen: boolean;
};

const SideBar = ({ children, isOpen }: PropsWithChildren<SideBarType>) => {
  return <Container isOpen={isOpen}>{children}</Container>;
};

export default SideBar;
