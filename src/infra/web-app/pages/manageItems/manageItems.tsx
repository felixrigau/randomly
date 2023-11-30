import { useState } from "react";
import ItemList from "../../components/itemList/itemList";
import Modal from "../../components/modal/modal";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import ItemForm from "../../components/itemForm/itemForm";
import { Item } from "../../../../application/model/Item";

export const ManageItems = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { create, update, remove, getAll } = useItemCRUD();
  const { addItem, setItems, setItem, item } = useItemsContext();

  const handleCreateClick = ({ title, text, isFixed }: Partial<Item>) => {
    const newItem = new Item(title, text, isFixed);
    create(newItem);
    addItem(newItem);
    setIsCreateModalOpen(false);
  };

  const handleUpdateClick = ({ title, text, isFixed }: Partial<Item>) => {
    update(item.id, { title, text, isFixed });
    setItems(getAll());
    setIsUpdateModalOpen(false);
  };

  const removeItemBy = (id: string) => {
    remove(id);
    setItems(getAll());
  };

  const editItem = (item: Item) => {
    setItem(item);
    setIsUpdateModalOpen(true);
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
              <button aria-label="edit item" onClick={() => editItem(item)}>
                Edit
              </button>
            </ItemList.Row>
          ))
        }
      </ItemList>

      <button onClick={() => setIsCreateModalOpen(true)}>Create</button>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ItemForm buttonText="Create" onButtonClick={handleCreateClick} />
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <ItemForm
          buttonText="Update"
          item={item}
          onButtonClick={handleUpdateClick}
        />
      </Modal>
    </>
  );
};
