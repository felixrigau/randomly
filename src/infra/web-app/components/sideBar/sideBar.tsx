import { PropsWithChildren } from "react";
import { Background, Container } from "./sideBar.styled";
import { useItemsContext } from "../../contexts/Items/useItemContext";

type SideBarType = {
  isOpen: boolean;
};

const SideBar = ({ children, isOpen }: PropsWithChildren<SideBarType>) => {
  const { toggleSideBar } = useItemsContext();

  return (
    <>
      <Background $isOpen={isOpen} onClick={toggleSideBar} />
      <Container $isOpen={isOpen}>{children}</Container>
    </>
  );
};

export default SideBar;
