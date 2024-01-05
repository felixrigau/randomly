import { useRef, useEffect } from "react";
import { ClearPreviousVisitedItems } from "../../../entities/visitedItem/application/useCases/ClearPreviousVisitedItems/ClearPreviousVisitedItems";
import { SaveLastVisitDate } from "../../../entities/visitedItem/application/useCases/UpdateLastVisitDate/SaveLastVisitDate";
import { WereItemsVisitedToday } from "../../../entities/visitedItem/application/useCases/WereItemsVisitedToday/WereItemsVisitedToday";
import ShowItem from "../../components/showItem/showItem";
import { VisitedItemIdStorageRepository } from "../../../entities/visitedItem/infra/VisitedItemIdStorageRepository";
import { Layout } from "../../components/layout/layout";

const respository = new VisitedItemIdStorageRepository();

export const MainPage = () => {
  const useCases = useRef({
    wereItemsVisitedToday: new WereItemsVisitedToday(respository),
    clearPreviousVisitedItems: new ClearPreviousVisitedItems(respository),
    saveLastVisitDate: new SaveLastVisitDate(respository),
  });

  useEffect(() => {
    useCases.current.wereItemsVisitedToday
      .execute()
      .then((areThereVisitedItems) => {
        if (!areThereVisitedItems) {
          useCases.current.clearPreviousVisitedItems.execute();
          useCases.current.saveLastVisitDate.execute(new Date());
        }
      });
  }, []);

  return (
    <Layout>
      <ShowItem />
    </Layout>
  );
};
