import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { Item } from "../../../../application/model/Item";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import ItemForm from "../itemForm/itemForm";
import { UpdateItemUseCase } from "../../../../application/useCases/UpdateItem/UpdateItemUseCase";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
const itemRepository = new ItemStorageRepository();

const UpdateItem = () => {
  const { setItems, item } = useItemsContext();

  const handleClick = ({ title, text, isFixed }: Partial<Item>) => {
    const updateItemUseCase = new UpdateItemUseCase(itemRepository);
    const getAllItemsUseCase = new GetAllItemsUseCase(itemRepository);

    updateItemUseCase.execute(item.id, { title, text, isFixed });

    setItems(getAllItemsUseCase.execute());
  };

  return (
    <ItemForm buttonText="Update" onButtonClick={handleClick} item={item} />
  );
};

export default UpdateItem;
