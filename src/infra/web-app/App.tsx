import CreateItem from "./components/createItem/createItem";
import ItemList from "./components/itemList/itemList";
import { ItemsProvider } from "./contexts/Items/itemContext";

export const App = () => (
  <ItemsProvider>
    <CreateItem />
    <ItemList />
  </ItemsProvider>
);
