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
  const { items, setItems } = useItemsContext();
  const { create } = useItemCRUD();

  const handleCreateClick = ({ title, text, isFixed }: Partial<Item>) => {
    const newItem = new Item(title, text, isFixed);
    create(newItem);
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  return (
    <>
      <ItemList>
        {(items) =>
          items.map((item) => <ItemList.Row key={item.id} item={item} />)
        }
      </ItemList>
      <UpdateItem />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ItemForm buttonText="Create" onButtonClick={handleCreateClick} />
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Create</button>
    </>
  );
};
