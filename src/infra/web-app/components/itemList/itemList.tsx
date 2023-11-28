import { ReactNode, useEffect, useRef } from "react";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import { Item } from "../../../../application/model/Item";
import Row from "./components/row/row";

const itemRepository = new ItemStorageRepository();

type ItemListType = {
  children: (items: Item[]) => ReactNode;
};

const ItemList = ({ children }: ItemListType) => {
  const { items, setItems } = useItemsContext();
  const useCases = useRef({
    getAllItems: new GetAllItemsUseCase(itemRepository),
  });

  useEffect(() => {
    setItems(useCases.current.getAllItems.execute());
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
