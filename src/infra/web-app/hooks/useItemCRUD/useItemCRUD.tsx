import { useRef } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { RemoveItemUseCase } from "../../../../application/useCases/RemoveItem/RemoveItemUseCase";
import { RemoveVisitedItemIdUseCase } from "../../../../application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../adapters/VisitedItemIdStorageRepository/VisitedItemIdStorageRepository";
import { Item } from "../../../../application/model/Item";
import { CreateItemUseCase } from "../../../../application/useCases/CreateItem/CreateItemUseCase";
import { UpdateItemUseCase } from "../../../../application/useCases/UpdateItem/UpdateItemUseCase";
import { GetItemRandomlyUseCase } from "../../../../application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { MarkItemFixedUseCase } from "../../../../application/useCases/MarkItemFixed/MarkItemFixedUseCase";

const itemRepository = new ItemStorageRepository();
const visitedItemRepository = new VisitedItemIdStorageRepository();

const useItemCRUD = () => {
  const useCases = useRef({
    createItem: new CreateItemUseCase(itemRepository),
    getAllItems: new GetAllItemsUseCase(itemRepository),
    removeItem: new RemoveItemUseCase(itemRepository),
    removeVisitedItemId: new RemoveVisitedItemIdUseCase(visitedItemRepository),
    updateItem: new UpdateItemUseCase(itemRepository),
    markItemFixed: new MarkItemFixedUseCase(itemRepository),
    getItemRandomly: new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    ),
  });

  const create = (item: Item): void => {
    useCases.current.createItem.execute(item);
  };
  const getAll = (): Item[] => useCases.current.getAllItems.execute();
  const getRandom = (): Item => useCases.current.getItemRandomly.execute();
  const remove = (id: string): void => {
    useCases.current.removeItem.execute(id);
    useCases.current.removeVisitedItemId.execute(id);
  };
  const update = (
    id: string,
    { title, text, isFixed, order }: Partial<Item>
  ): void => {
    useCases.current.updateItem.execute(id, { title, text, isFixed, order });
  };
  const markFixed = (id: string, isFixed: boolean): void => {
    useCases.current.markItemFixed.execute(id, isFixed);
  };

  return { create, getAll, getRandom, remove, update, markFixed };
};

export default useItemCRUD;
