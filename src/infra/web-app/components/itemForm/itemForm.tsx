import { useState } from "react";
import { Item } from "../../../../application/model/Item";
type ItemFormType = {
  buttonText: string;
  onButtonClick: (item: Partial<Item>) => void;
  item?: Item;
};

const ItemForm = ({ buttonText, onButtonClick, item }: ItemFormType) => {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.text ?? "");
  const [isFixed, setIsFixed] = useState(Boolean(item?.isFixed));

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
      <button
        disabled={!title}
        onClick={() => onButtonClick({ title, text: description, isFixed })}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ItemForm;
