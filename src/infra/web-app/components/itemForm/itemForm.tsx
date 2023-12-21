import { StyledForm } from "./itemForm.styled";
import { useItemsContext } from "../../contexts/Items/useItemContext";

const ItemForm = () => {
  const { item, setItem } = useItemsContext();

  return (
    <StyledForm>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={item?.title}
        onChange={(e) => {
          setItem((item) => ({ ...item, title: e.target.value }));
        }}
      />
      <label htmlFor="text">Text</label>
      <textarea
        id="text"
        value={item?.text}
        onChange={(e) => {
          setItem((item) => ({ ...item, text: e.target.value }));
        }}
      />
      <label htmlFor="order">Order</label>
      <input
        id="order"
        type="number"
        value={item?.order}
        onChange={(e) => {
          setItem((item) => ({ ...item, order: parseInt(e.target.value) }));
        }}
      />
      <label htmlFor="isFixed">
        <input
          id="isFixed"
          type="checkbox"
          checked={Boolean(item?.isFixed)}
          onChange={(e) => {
            setItem((item) => ({ ...item, isFixed: e.target.checked }));
          }}
        />
        IsFixed
      </label>
    </StyledForm>
  );
};

export default ItemForm;
