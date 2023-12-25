import { PropsWithChildren } from "react";
import { LeftContainer, StyledRow, StyledTitle } from "./row.styled";
import DragHandleIcon from "@mui/icons-material/DragHandle";

type RowType = {
  title: string;
};

const Row = ({
  children,
  title,
}: PropsWithChildren<RowType>) => {
  return (
    <StyledRow
      role="listitem"
      draggable={allowDragAndDrop}
      onDrag={(ev) => console.log("ev", ev)}
    >
      <LeftContainer>
        <StyledTitle $isTextAlong={!allowDragAndDrop}>{title}</StyledTitle>
      </LeftContainer>
      <div>{children}</div>
    </StyledRow>
  );
};

export default Row;

// comment
