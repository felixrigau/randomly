import { Item } from "../../application/model/Item";
import { CreateItemUseCase } from "../../application/useCases/CreateItem/CreateItemUseCase";
import { GetAllItemsUseCase } from "../../application/useCases/GetAllItems/GetAllItemsUseCase";
import { ItemStorageRepository } from "../adapters/ItemStorageRepository/ItemStorageRepository";
import CreateForm from "./components/CreateForm/createForm";

const repository = new ItemStorageRepository();
const createItem = new CreateItemUseCase(repository);
createItem.execute(new Item("Lissy"));
createItem.execute(new Item("Mi familia1"));

const getAllItems = new GetAllItemsUseCase(repository);
const list = getAllItems.execute();

export const App = () => (
  <>
    <CreateForm />
  </>
);
