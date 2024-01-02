import { ReactNode, useEffect, useRef } from "react";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { Item } from "../../../../application/model/Item";
import Row from "./components/row/row";
import { GetOrderedItemsUseCase } from "../../../../application/useCases/GetOrderedItems/GetOrderedItemsUseCase";

const itemRepository = new ItemStorageRepository();

type ItemListType = {
  children: (items: Item[]) => ReactNode;
};

const ItemList = ({ children }: ItemListType) => {
  const { items, setItems } = useItemsContext();
  const useCases = useRef({
    getOrderedItems: new GetOrderedItemsUseCase(itemRepository),
  });

  useEffect(() => {
    useCases.current.getOrderedItems.execute().then((items) => setItems(items));
  }, []);

  return (
    <div role="list">
      {items.length === 0 && <p key="message">There are no items</p>}
      {children(items)}
    </div>
  );
};

ItemList.Row = Row;

export default ItemList;
