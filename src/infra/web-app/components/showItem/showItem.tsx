import { useEffect, useRef, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { NoMoreItemsError } from "../../../../application/useCases/GetItemRandomly/NoMoreItemsError";

const ShowItem = () => {
  const [item, setItem] = useState<Item>(null);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const useCases = useRef({
    getItemRandomly: new GetItemRandomlyUseCase(
      new ItemStorageRepository(),
      new VisitedItemIdStorageRepository()
    ),
  });

  const getItem = () => {
    try {
      setItem(useCases.current.getItemRandomly.execute());
    } catch (error: unknown) {
      if (error instanceof NoMoreItemsError) {
        setHasMoreItems(false);
      }
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <section>
      {item && hasMoreItems && <p>{item.title}</p>}
      {!hasMoreItems && <p>No more items to show</p>}
      <button onClick={getItem} aria-label="get next item">
        Next
      </button>
    </section>
  );
};

export default ShowItem;
