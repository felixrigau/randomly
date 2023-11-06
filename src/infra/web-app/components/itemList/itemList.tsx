import { useEffect, useState } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { Item } from "../../../../application/model/Item";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getAllItems = new GetAllItemsUseCase(new ItemStorageRepository());
    const result = getAllItems.execute();
    setItems(result);
  }, []);

  return (
    <div role="list">
      {items.length === 0 && <p>There are no items</p>}
      {items.map((item) => (
        <div key={item.id} role="listitem">
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
