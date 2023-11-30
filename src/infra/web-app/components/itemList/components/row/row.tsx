import { Item } from "../../../../../../application/model/Item";
import { useItemsContext } from "../../../../contexts/Items/useItemContext";
import useItemCRUD from "../../../../hooks/useItemCRUD/useItemCRUD";

type RowType = {
  item: Item;
};

const Row = ({ item }: RowType) => {
  const { setItems, setItem } = useItemsContext();
  const { remove, getAll } = useItemCRUD();

  const removeItemBy = (id: string) => {
    remove(id);
    setItems(getAll());
  };

  return (
    <div role="listitem">
      {item.title}
      <button aria-label="remove item" onClick={() => removeItemBy(item.id)}>
        X
      </button>
      <button aria-label="edit item" onClick={() => setItem(item)}>
        Edit
      </button>
    </div>
  );
};

export default Row;
