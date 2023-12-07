import { useState } from "react";
import ItemList from "../../components/itemList/itemList";
import Modal from "../../components/modal/modal";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import ItemForm from "../../components/itemForm/itemForm";
import { Item } from "../../../../application/model/Item";
import { StyledModalContainer } from "../../components/modal/modal.styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { StyledContainer } from "./manageItems.styled";
import { StyledButtonContainer } from "../shared/styles.styled";

export const ManageItems = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    setIsDeleteModalOpen(false);
  };

  const openDeleteConfirmationModal = (item: Item) => {
    setIsDeleteModalOpen(true);
    setItem(item);
  };

  const editItem = (item: Item) => {
    setIsUpdateModalOpen(true);
    setItem(item);
  };

  return (
    <StyledContainer>
      <ItemList>
        {(items) =>
          items.map((item) => (
            <ItemList.Row key={item.id} item={item}>
              <button
                aria-label="open remove modal"
                onClick={() => openDeleteConfirmationModal(item)}
              >
                <DeleteOutlineIcon />
              </button>
              <button aria-label="edit item" onClick={() => editItem(item)}>
                <EditIcon />
              </button>
            </ItemList.Row>
          ))
        }
      </ItemList>
      <StyledButtonContainer>
        <button onClick={() => setIsCreateModalOpen(true)}>
          <AddIcon />
        </button>
      </StyledButtonContainer>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <Modal.Header hasCloseButton>Create Item</Modal.Header>
        <StyledModalContainer>
          <ItemForm buttonText="Create" onButtonClick={handleCreateClick} />
        </StyledModalContainer>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <Modal.Header hasCloseButton>Update Item</Modal.Header>
        <StyledModalContainer>
          <ItemForm
            buttonText="Update"
            item={item}
            onButtonClick={handleUpdateClick}
          />
        </StyledModalContainer>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header hasCloseButton> Delete confirmation </Modal.Header>
        <StyledModalContainer>
          <p>Are you sure about deleting {item?.title} ?</p>
          <div>
            <button
              aria-label="cancel deletion"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No
            </button>
            <button
              aria-label="remove item"
              onClick={() => removeItemBy(item.id)}
            >
              Yes
            </button>
          </div>
        </StyledModalContainer>
      </Modal>
    </StyledContainer>
  );
};
