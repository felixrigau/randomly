import { PropsWithChildren } from "react";
import { Item } from "../../../../../../application/model/Item";

type RowType = {
  item: Item;
};

const Row = ({ children, item }: PropsWithChildren<RowType>) => {
  return (
    <div role="listitem">
      {item.title}
      {children}
    </div>
  );
};

export default Row;
