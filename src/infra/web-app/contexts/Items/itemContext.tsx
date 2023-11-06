import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Item } from "../../../../application/model/Item";

type ItemsContextType = {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

const ItemContext = createContext<ItemsContextType>(null);

type OnlyChildren = {
  children: ReactNode;
};

export const ItemsProvider = ({ children }: OnlyChildren) => {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
