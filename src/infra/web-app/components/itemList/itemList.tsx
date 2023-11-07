import { useEffect } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { useItemsContext } from "../../contexts/Items/useItemContext";

const ItemList = () => {
  const { items, setItems } = useItemsContext();

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
