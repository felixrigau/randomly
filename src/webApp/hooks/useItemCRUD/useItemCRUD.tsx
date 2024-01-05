import { useRef } from "react";
import { GetAllItemsUseCase } from "../../../entities/item/application/useCases/itemCRUD/GetAllItems/GetAllItemsUseCase";
import { RemoveItemUseCase } from "../../../entities/item/application/useCases/itemCRUD/RemoveItem/RemoveItemUseCase";
import { RemoveVisitedItemIdUseCase } from "../../../entities/visitedItem/application/useCases/RemoveVisitedItemId/RemoveVisitedItemIdUseCase";
import { ItemStorageRepository } from "../../../entities/item/infra/ItemStorageRepository";
import { VisitedItemIdStorageRepository } from "../../../entities/visitedItem/infra/VisitedItemIdStorageRepository";
import { Item } from "../../../entities/item/application/domain/Item";
import { CreateItemUseCase } from "../../../entities/item/application/useCases/itemCRUD/CreateItem/CreateItemUseCase";
import { UpdateItemUseCase } from "../../../entities/item/application/useCases/itemCRUD/UpdateItem/UpdateItemUseCase";
import { GetItemRandomlyUseCase } from "../../../entities/item/application/useCases/GetItemRandomly/GetItemRandomlyUseCase";
import { MarkItemFixedUseCase } from "../../../entities/item/application/useCases/MarkItemFixed/MarkItemFixedUseCase";
import { GetOrderedItemsUseCase } from "../../../entities/item/application/useCases/GetOrderedItems/GetOrderedItemsUseCase";

const itemRepository = new ItemStorageRepository();
const visitedItemRepository = new VisitedItemIdStorageRepository();

const useItemCRUD = () => {
  const useCases = useRef({
    createItem: new CreateItemUseCase(itemRepository),
    getAllItems: new GetAllItemsUseCase(itemRepository),
    getOrderedItems: new GetOrderedItemsUseCase(itemRepository),
    removeItem: new RemoveItemUseCase(itemRepository),
    removeVisitedItemId: new RemoveVisitedItemIdUseCase(visitedItemRepository),
    updateItem: new UpdateItemUseCase(itemRepository),
    markItemFixed: new MarkItemFixedUseCase(itemRepository),
    getItemRandomly: new GetItemRandomlyUseCase(
      itemRepository,
      visitedItemRepository
    ),
  });

  const create = (item: Item) => {
    useCases.current.createItem.execute(item);
  };
  const getAll = async () => useCases.current.getAllItems.execute();
  const getOrderedItems = async () =>
    useCases.current.getOrderedItems.execute();
  const getRandom = async () => useCases.current.getItemRandomly.execute();
  const remove = async (id: string) => {
    useCases.current.removeItem.execute(id);
    useCases.current.removeVisitedItemId.execute(id);
  };
  const update = async (
    id: string,
    { title, text, isFixed, order }: Partial<Item>
  ) => {
    useCases.current.updateItem.execute(id, { title, text, isFixed, order });
  };
  const markFixed = async (id: string, isFixed: boolean) => {
    useCases.current.markItemFixed.execute(id, isFixed);
  };

  return {
    create,
    getAll,
    getOrderedItems,
    getRandom,
    remove,
    update,
    markFixed,
  };
};

export default useItemCRUD;
