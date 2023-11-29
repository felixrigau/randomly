import { useRef } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { RemoveItemUseCase } from "../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import { RemoveVisitedItemIdUseCase } from "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { Item } from "../../../../application/model/Item";
import { CreateItemUseCase } from "../../../../application/useCases/CreateItem/CreateItemUseCase";

const itemRepository = new ItemStorageRepository();
const visitedItemRepository = new VisitedItemIdStorageRepository();

const useItemCRUD = () => {
  const useCases = useRef({
    getAllItems: new GetAllItemsUseCase(itemRepository),
    removeItem: new RemoveItemUseCase(itemRepository),
    createItem: new CreateItemUseCase(itemRepository),
    removeVisitedItemId: new RemoveVisitedItemIdUseCase(visitedItemRepository),
  });

  const getAll = (): Item[] => useCases.current.getAllItems.execute();
  const remove = (id: string): void => {
    useCases.current.removeItem.execute(id);
    useCases.current.removeVisitedItemId.execute(id);
  };
  const create = (item: Item): void => {
    useCases.current.createItem.execute(item);
  };

  return { getAll, remove, create };
};

export default useItemCRUD;
