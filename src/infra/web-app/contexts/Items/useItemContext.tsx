import { useContext } from "react";
import ItemsContext from "./itemContext";

export const useItemsContext = () => {
  const contextValue = useContext(ItemsContext);

  if (!contextValue)
    throw new Error(
      "You are trying to access a context without being inside its scope"
    );

  return { ...contextValue, existItems: contextValue.items.length !== 0 };
};
