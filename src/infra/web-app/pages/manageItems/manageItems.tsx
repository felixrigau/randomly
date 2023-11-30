import { useState } from "react";
import ItemList from "../../components/itemList/itemList";
import UpdateItem from "../../components/updateItem/updateItem";
import Modal from "../../components/modal/modal";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import ItemForm from "../../components/itemForm/itemForm";
import { Item } from "../../../../application/model/Item";

export const ManageItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { create, remove, getAll } = useItemCRUD();
  const { addItem, setItems, setItem } = useItemsContext();

  const handleCreateClick = ({ title, text, isFixed }: Partial<Item>) => {
    const newItem = new Item(title, text, isFixed);
    create(newItem);
    addItem(newItem);
    setIsModalOpen(false);
  };

  const removeItemBy = (id: string) => {
    remove(id);
    setItems(getAll());
  };

  return (
    <>
      <ItemList>
        {(items) =>
          items.map((item) => (
            <ItemList.Row key={item.id} item={item}>
              <button
                aria-label="remove item"
                onClick={() => removeItemBy(item.id)}
              >
                X
              </button>
              <button aria-label="edit item" onClick={() => setItem(item)}>
                Edit
              </button>
            </ItemList.Row>
          ))
        }
      </ItemList>
      <UpdateItem />
      <button onClick={() => setIsModalOpen(true)}>Create</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ItemForm buttonText="Create" onButtonClick={handleCreateClick} />
      </Modal>
    </>
  );
};
