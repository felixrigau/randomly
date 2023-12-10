import { useRef, useEffect } from "react";
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

const respository = new VisitedItemIdStorageRepository();

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
    <>
      <StyledHeader>
        <div />
        <MenuButton>
          <MenuIcon />
        </MenuButton>
      </StyledHeader>
      <ShowItem />
      <SideBar isOpen={isSideBarOpen}>
        <Link to={"/items"}>Manage Items</Link>
      </SideBar>
    </>
  );
};
