import { CreateItemUseCase } from "../../../../application/useCases/CreateItem/CreateItemUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { Item } from "../../../../application/model/Item";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import ItemForm from "../itemForm/itemForm";

const CreateForm = () => {
  const { items, setItems } = useItemsContext();

  const handleClick = ({ title, text, isFixed }: Partial<Item>) => {
    const createItemUseCase = new CreateItemUseCase(
      new ItemStorageRepository()
    );
    const newItem = new Item(title, text, isFixed);
    createItemUseCase.execute(newItem);
    setItems([...items, newItem]);
  };

  return <ItemForm buttonText="Create" onButtonClick={handleClick} />;
};

export default CreateForm;
