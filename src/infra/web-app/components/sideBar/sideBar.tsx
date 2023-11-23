import { PropsWithChildren } from "react";
import { Background, Container } from "./sideBar.styled";

type SideBarType = {
  isOpen: boolean;
};

const SideBar = ({ children, isOpen }: PropsWithChildren<SideBarType>) => {
  return (
    <>
      <Background isOpen={isOpen} />
      <Container isOpen={isOpen}>{children}</Container>
    </>
  );
};

export default SideBar;
