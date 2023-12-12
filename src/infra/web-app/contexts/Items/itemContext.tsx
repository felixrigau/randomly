import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Item } from "../../../../application/model/Item";

type ItemsContextType = {
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

const ItemContext = createContext<ItemsContextType>(null);

type OnlyChildren = {
  children: ReactNode;
};

export const ItemsProvider = ({ children }: OnlyChildren) => {
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item | null>(null);

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        item,
        setItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
