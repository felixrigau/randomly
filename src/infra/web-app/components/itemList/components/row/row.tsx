import { useRef } from "react";
import { Item } from "../../../../../../application/model/Item";
import { GetAllItemsUseCase } from "../../../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { RemoveItemUseCase } from "../../../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import { RemoveVisitedItemIdUseCase } from "../../../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { useItemsContext } from "../../../../contexts/Items/useItemContext";
import { ItemStorageRepository } from "../../../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";

type RowType = {
  item: Item;
};

const itemRepository = new ItemStorageRepository();
const visitedItemRepository = new VisitedItemIdStorageRepository();

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

export default Row;
