import CreateItem from "./components/createItem/createItem";
import ItemList from "./components/itemList/itemList";
import ShowItem from "./components/showItem/showItem";
import { ItemsProvider } from "./contexts/Items/itemContext";

export const App = () => (
  <ItemsProvider>
    <span>
      <ShowItem />
    </span>
    <span>
      <CreateItem />
      <ItemList />
    </span>
  </ItemsProvider>
);
