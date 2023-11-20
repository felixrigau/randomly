import { useEffect, useRef } from "react";
import CreateItem from "./components/createItem/createItem";
import ItemList from "./components/itemList/itemList";
import ShowItem from "./components/showItem/showItem";
import { WereItemsVisitedToday } from "../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import { VisitedItemIdStorageRepository } from "../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { ClearPreviousVisitedItems } from "../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { useItemsContext } from "./contexts/Items/useItemContext";
import { SaveLastVisitDate } from "../../application/useCases/UpdateLastVisitDate/SaveLastVisitDate";

const respository = new VisitedItemIdStorageRepository();

export const App = () => {
  const { existItems } = useItemsContext();
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
      <span>{existItems && <ShowItem />}</span>
      <span>
        <CreateItem />
        <ItemList />
      </span>
    </>
  );
};
