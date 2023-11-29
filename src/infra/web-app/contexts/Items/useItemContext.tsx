import { useContext } from "react";
import ItemsContext from "./itemContext";
import { Item } from "../../../../application/model/Item";

export const useItemsContext = () => {
  const contextValue = useContext(ItemsContext);

  if (!contextValue)
    throw new Error(
      "You are trying to access a context without being inside its scope"
    );

  const { items, setItems, item, setItem, isSideBarOpen, setIsSideBarOpen } =
    contextValue;

  return {
    items,
    setItems,
    item,
    setItem,
    addItem: (item: Item) => setItems((items) => [...items, item]),
    isSideBarOpen,
    existItems: items.length !== 0,
    toggleSideBar: () => setIsSideBarOpen(!isSideBarOpen),
  };
};
