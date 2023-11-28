import { useState } from "react";
import CreateItem from "../../components/createItem/createItem";
import ItemList from "../../components/itemList/itemList";
import UpdateItem from "../../components/updateItem/updateItem";
import Modal from "../../components/modal/modal";

export const ManageItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ItemList />
      <UpdateItem />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateItem />
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>Create</button>
    </>
  );
};
