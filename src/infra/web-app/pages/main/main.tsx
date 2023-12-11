import { useRef, useEffect } from "react";
import { ClearPreviousVisitedItems } from "../../../../application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { SaveLastVisitDate } from "../../../../application/useCases/UpdateLastVisitDate/SaveLastVisitDate";
import { WereItemsVisitedToday } from "../../../../application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import ShowItem from "../../components/showItem/showItem";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { Layout } from "../../components/layout/layout";

const respository = new VisitedItemIdStorageRepository();

export const MainPage = () => {
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
