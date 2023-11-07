import { useState } from "react";
import { CreateItemUseCase } from "../../../../application/useCases/CreateItem/CreateItemUseCase";
import { ItemStorageRepository } from "../../../adapters/ItemStorageRepository/ItemStorageRepository";
import { Item } from "../../../../application/model/Item";
import { useItemsContext } from "../../contexts/Items/useItemContext";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const { items, setItems } = useItemsContext();

  const handleClick = () => {
    const createItemUseCase = new CreateItemUseCase(
      new ItemStorageRepository()
    );
    const newItem = new Item(title, description, isFixed);
    createItemUseCase.execute(newItem);
    setItems([...items, newItem]);
  };

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label htmlFor="isFixed">IsFixed</label>
      <input
        id="isFixed"
        type="checkbox"
        onChange={(e) => {
          setIsFixed(e.target.checked);
        }}
      />
      <button disabled={!title} onClick={handleClick}>
        Create
      </button>
    </div>
  );
};

export default CreateForm;
