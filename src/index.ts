import { Item } from "./application/model/Item";
import { CreateItemUseCase } from "./application/useCases/CreateItem/CreateItemUseCase";
import { GetAllItemsUseCase } from "./application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "./infra/adapters/ItemStorageRepository/ItemStorageRepository";

const repository = new ItemStorageRepository();
const createItem = new CreateItemUseCase(repository);
createItem.execute(new Item("Lissy"));
createItem.execute(new Item("Mi familia"));

const getAllItems = new GetAllItemsUseCase(repository);

console.log(getAllItems.execute());
