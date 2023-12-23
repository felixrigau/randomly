import { useState } from "react";
import ItemList from "../../components/itemList/itemList";
import Modal from "../../components/modal/modal";
import { useItemsContext } from "../../contexts/Items/useItemContext";
import useItemCRUD from "../../hooks/useItemCRUD/useItemCRUD";
import ItemForm from "../../components/itemForm/itemForm";
import { Item } from "../../../../application/model/Item";
import { StyledModalContent } from "../../components/modal/modal.styled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  ButtonsContainer,
  StyledActionButton,
  StyledActionButtonsContainer,
  StyledContainer,
  StyledPinButton,
} from "./manageItems.styled";
import {
  StyledButton,
  StyledFixedButtonContainer,
} from "../../shared/styles.styled";
import { Layout } from "../../components/layout/layout";

export const ManageItems = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { create, update, remove, getOrderedItems, markFixed } = useItemCRUD();
  const { addItem, setItems, setItem, item } = useItemsContext();

  const updateItemList = async () => {
    const items = await getOrderedItems();
    setItems(items);
  };

  const handlePinClick = async (id: string, isFixed: boolean) => {
    await markFixed(id, isFixed);
    await updateItemList();
  };

  const handleCreateClick = async ({
    title,
    text,
    isFixed,
    order,
  }: Partial<Item>) => {
    const newItem = new Item(title, text, isFixed, order);
    await create(newItem);
    await addItem(newItem);
    setIsCreateModalOpen(false);
    setItem(null);
  };

  const handleUpdateClick = async ({
    title,
    text,
    isFixed,
    order,
  }: Partial<Item>) => {
    await update(item.id, { title, text, isFixed, order });
    await updateItemList();
    setIsUpdateModalOpen(false);
    setItem(null);
  };

  const removeItemBy = async (id: string) => {
    await remove(id);
    await updateItemList();
    setItem(null);
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
    <>
      <Layout>
        <StyledContainer>
          <ItemList>
            {(items) =>
              items.map((item) => (
                <ItemList.Row
                  key={item.id}
                  title={item.title}
                  allowDragAndDrop={item.isFixed}
                >
                  <StyledActionButtonsContainer>
                    <StyledPinButton
                      aria-label="pin item"
                      $isFixed={item.isFixed}
                      onClick={() => handlePinClick(item.id, !item.isFixed)}
                    >
                      <PushPinIcon />
                    </StyledPinButton>
                    <StyledActionButton
                      aria-label="open remove modal"
                      onClick={() => openDeleteConfirmationModal(item)}
                    >
                      <DeleteOutlineIcon />
                    </StyledActionButton>
                    <StyledActionButton
                      aria-label="edit item"
                      onClick={() => editItem(item)}
                    >
                      <EditIcon />
                    </StyledActionButton>
                  </StyledActionButtonsContainer>
                </ItemList.Row>
              ))
            }
          </ItemList>
          <StyledFixedButtonContainer>
            <button onClick={() => setIsCreateModalOpen(true)}>
              <AddIcon />
            </button>
          </StyledFixedButtonContainer>
        </StyledContainer>
      </Layout>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <Modal.Header hasCloseButton>Create Item</Modal.Header>
        <StyledModalContent>
          <ItemForm />
        </StyledModalContent>
        <ButtonsContainer>
          <StyledButton
            disabled={!item?.title}
            onClick={() => {
              handleCreateClick({
                title: item.title,
                text: item.text,
                order: item.order,
                isFixed: item.isFixed,
              });
            }}
          >
            Create
          </StyledButton>
        </ButtonsContainer>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <Modal.Header hasCloseButton>Update Item</Modal.Header>
        <StyledModalContent>
          <ItemForm />
        </StyledModalContent>
        <ButtonsContainer>
          <StyledButton
            disabled={!item?.title}
            onClick={() => {
              handleUpdateClick(item);
            }}
          >
            Update
          </StyledButton>
        </ButtonsContainer>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header hasCloseButton> Delete confirmation </Modal.Header>
        <StyledModalContent>
          <p>Are you sure about deleting {item?.title} ?</p>
        </StyledModalContent>
        <ButtonsContainer>
          <StyledButton
            aria-label="cancel deletion"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            No
          </StyledButton>
          <StyledButton
            aria-label="remove item"
            onClick={() => removeItemBy(item.id)}
          >
            Yes
          </StyledButton>
        </ButtonsContainer>
      </Modal>
    </>
  );
};
