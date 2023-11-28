import { ReactNode, useEffect, useRef } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { RemoveItemUseCase } from "../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { RemoveVisitedItemIdUseCase } from "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { Item } from "../../../../application/model/Item";

const itemRepository = new ItemStorageRepository();
const visitedItemRepository = new VisitedItemIdStorageRepository();

type ItemListType = {
  children: (items: Item[]) => ReactNode;
};

const ItemList = ({ children }: ItemListType) => {
  const { items, setItems } = useItemsContext();
  const useCases = useRef({
    getAllItems: new GetAllItemsUseCase(itemRepository),
    removeItem: new RemoveItemUseCase(itemRepository),
    removeVisitedItemId: new RemoveVisitedItemIdUseCase(visitedItemRepository),
  });

  const getAllItems = () => {
    setItems(useCases.current.getAllItems.execute());
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div role="list">
      {items.length === 0 && <p>There are no items</p>}
      {children(items)}
    </div>
  );
};

type RowType = {
  item: Item;
};

const Row = ({ item }: RowType) => {
  const { setItems, setItem } = useItemsContext();
  const useCases = useRef({
    getAllItems: new GetAllItemsUseCase(itemRepository),
    removeItem: new RemoveItemUseCase(itemRepository),
    removeVisitedItemId: new RemoveVisitedItemIdUseCase(visitedItemRepository),
  });

  const removeItemBy = (id: string) => {
    useCases.current.removeItem.execute(id);
    useCases.current.removeVisitedItemId.execute(id);
    setItems(useCases.current.getAllItems.execute());
  };

  return (
    <div key={item.id} role="listitem">
      {item.title}
      <button aria-label="remove item" onClick={() => removeItemBy(item.id)}>
        X
      </button>
      <button aria-label="edit item" onClick={() => setItem(item)}>
        Edit
      </button>
    </div>
  );
};

ItemList.Row = Row;

export default ItemList;
