import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { Item } from "../../../../application/model/Item";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import ItemForm from "../itemForm/itemForm";
import { UpdateItemUseCase } from "../../../../application/useCases/UpdateItem/UpdateItemUseCase";
import { GetAllItemsUseCase } from "../../../../application/useCases/GetAllItems/GetAllItemsUseCase";
type UpdateItemType = {
  itemId: string;
};

const itemRepository = new ItemStorageRepository();

const UpdateItem = ({ itemId }: UpdateItemType) => {
  const { setItems } = useItemsContext();

  const handleClick = ({ title, text, isFixed }: Partial<Item>) => {
    const createItemUseCase = new UpdateItemUseCase(itemRepository);
    const getAllItemsUseCase = new GetAllItemsUseCase(itemRepository);

    createItemUseCase.execute(itemId, { title, text, isFixed });

    setItems(getAllItemsUseCase.execute());
  };

  return <ItemForm buttonText="Update" onButtonClick={handleClick} />;
};

export default UpdateItem;
