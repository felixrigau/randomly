import { PropsWithChildren } from "react";
import { Item } from "../../../../../../application/model/Item";
import { StyledRow } from "./row.styled";

type RowType = {
  item: Item;
};

const Row = ({ children, item }: PropsWithChildren<RowType>) => {
  return (
    <StyledRow role="listitem">
      {item.title}
      <div>{children}</div>
    </StyledRow>
  );
};

export default Row;
