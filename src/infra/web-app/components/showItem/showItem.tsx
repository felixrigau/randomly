import { useEffect, useRef, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";

const ShowItem = () => {
  const [item, setItem] = useState<Item>(null);
  const useCases = useRef({
    getItemRandomly: new GetItemRandomlyUseCase(
      new ItemStorageRepository(),
      new VisitedItemIdStorageRepository()
    ),
  });

  const getItem = () => {
    setItem(useCases.current.getItemRandomly.execute());
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <section>
      {item && <p>{item.title}</p>}
      <button onClick={getItem} aria-label="get next item">
        Next
      </button>
    </section>
  );
};

export default ShowItem;
