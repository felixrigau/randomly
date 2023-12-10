import { useEffect, useState } from "react";
import { Item } from "../../../../application/model/Item";
import { StyledForm } from "./itemForm.styled";
type ItemFormType = {
  buttonText: string;
  onButtonClick: (item: Partial<Item>) => void;
  previousItem?: Item;
};

const initialState: Partial<Item> = { title: "", text: "", isFixed: false };

const ItemForm = ({
  buttonText,
  onButtonClick,
  previousItem,
}: ItemFormType) => {
  const [item, setItem] = useState<Partial<Item>>(initialState);

  const clearForm = () => {
    setItem(initialState);
  };

  useEffect(() => {
    if (previousItem) {
      setItem(previousItem);
    }
  }, [previousItem]);

  return (
    <StyledForm>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={item.title}
        onChange={(e) => {
          setItem((item) => ({ ...item, title: e.target.value }));
        }}
      />
      <label htmlFor="text">Text</label>
      <textarea
        id="text"
        value={item.text}
        onChange={(e) => {
          setItem((item) => ({ ...item, text: e.target.value }));
        }}
      />
      <label htmlFor="isFixed">
        <input
          id="isFixed"
          type="checkbox"
          onChange={(e) => {
            setItem((item) => ({ ...item, isFixed: e.target.checked }));
          }}
        />
        IsFixed
      </label>
      <button
        disabled={!item.title}
        onClick={() => {
          clearForm();
          onButtonClick({
            title: item.title,
            text: item.text,
            isFixed: item.isFixed,
          });
        }}
      >
        {buttonText}
      </button>
    </StyledForm>
  );
};

export default ItemForm;
