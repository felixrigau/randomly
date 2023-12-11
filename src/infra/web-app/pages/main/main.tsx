import { useRef, useEffect, PropsWithChildren } from "react";
import { ClearPreviousVisitedItems } from "../../../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { SaveLastVisitDate } from "../../../../application/useCases/UpdateLastVisitDate/SaveLastVisitDate";
import { WereItemsVisitedToday } from "../../../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { MenuButton } from "../../components/menuButton/menuButton";
import ShowItem from "../../components/showItem/showItem";
import SideBar from "../../components/sideBar/sideBar";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { Link } from "react-router-dom";
import { StyledHeader } from "../shared/styles.styled";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

const respository = new VisitedItemIdStorageRepository();

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Layout = ({ children }: PropsWithChildren) => {
  const { isSideBarOpen } = useItemsContext();
  return (
    <>
      <Container>
        <StyledHeader>
          <div />
          <MenuButton>
            <MenuIcon />
          </MenuButton>
        </StyledHeader>
        <div style={{ border: "1px solid red" }}>
          <SideBar isOpen={isSideBarOpen}>
            <Link to={"/items"}>Manage Items</Link>
          </SideBar>
          {children}
        </div>
      </Container>
    </>
  );
};

export const MainPage = () => {
  const { isSideBarOpen } = useItemsContext();
  const useCases = useRef({
    wereItemsVisitedToday: new WereItemsVisitedToday(respository),
    clearPreviousVisitedItems: new ClearPreviousVisitedItems(respository),
    saveLastVisitDate: new SaveLastVisitDate(respository),
  });

  useEffect(() => {
    const wereItemsVisitedToday =
      useCases.current.wereItemsVisitedToday.execute();

    if (!wereItemsVisitedToday) {
      useCases.current.clearPreviousVisitedItems.execute();
      useCases.current.saveLastVisitDate.execute(new Date());
    }
  }, []);

  return (
    <Layout>
      <ShowItem />
    </Layout>
  );
};
