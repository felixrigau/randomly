import { useEffect, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { StyledForm } from "./itemForm.styled";
type ItemFormType = {
  buttonText: string;
  onButtonClick: (item: Partial<Item>) => void;
  item?: Item;
};

const ItemForm = ({ buttonText, onButtonClick, item }: ItemFormType) => {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.text ?? "");
  const [isFixed, setIsFixed] = useState(Boolean(item?.isFixed));

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setIsFixed(false);
  };

  useEffect(() => {
    setTitle(item?.title ?? "");
    setDescription(item?.text ?? "");
    setIsFixed(Boolean(item?.isFixed));
  }, [item]);

  return (
    <StyledForm>
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
      <textarea
        id="description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label htmlFor="isFixed">
        <input
          id="isFixed"
          type="checkbox"
          onChange={(e) => {
            setIsFixed(e.target.checked);
          }}
        />
        IsFixed
      </label>
      <button
        disabled={!title}
        onClick={() => {
          clearForm();
          onButtonClick({ title, text: description, isFixed });
        }}
      >
        {buttonText}
      </button>
    </StyledForm>
  );
};

export default ItemForm;
