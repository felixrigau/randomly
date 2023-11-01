import { Item } from "./application/model/Item";
import { CreateItemUseCase } from "./application/useCases/CreateItem/CreateItemUseCase";
import { GetAllItemsUseCase } from "./application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "./infra/adapters/ItemStorageRepository/ItemStorageRepository";

const repository = new ItemStorageRepository();
const createItem = new CreateItemUseCase(repository);
createItem.execute(new Item("Lissy"));
createItem.execute(new Item("Mi familia"));

const getAllItems = new GetAllItemsUseCase(repository);

import { createRoot } from "react-dom/client";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<h1>{getAllItems.execute()[0].title}</h1>);
