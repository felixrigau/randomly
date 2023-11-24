import { useEffect, useRef } from "react";
import CreateItem from "./components/createItem/createItem";
import ItemList from "./components/itemList/itemList";
import ShowItem from "./components/showItem/showItem";
import { WereItemsVisitedToday } from "../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import { VisitedItemIdStorageRepository } from "../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { ClearPreviousVisitedItems } from "../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { useItemsContext } from "./contexts/Items/useItemContext";
import { SaveLastVisitDate } from "../../application/useCases/UpdateLastVisitDate/SaveLastVisitDate";
import UpdateItem from "./components/updateItem/updateItem";
import SideBar from "./components/sideBar/sideBar";
import { Button } from "./components/menuButton/menuButton";
import { ResetStyles } from "./App.styled";

const respository = new VisitedItemIdStorageRepository();

export const App = () => {
  const { existItems, toggleSideBar, isSideBarOpen } = useItemsContext();
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
      <ResetStyles />
      <ShowItem />
      <Button onClick={toggleSideBar}>menu</Button>
      <SideBar isOpen={isSideBarOpen}>
        <CreateItem />
        <ItemList />
        <UpdateItem />
      </SideBar>
    </>
  );
};
