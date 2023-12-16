import { PropsWithChildren } from "react";
import { LeftContainer, StyledRow, StyledTitle } from "./row.styled";
import DragHandleIcon from "@mui/icons-material/DragHandle";

type RowType = {
  title: string;
  allowDragAndDrop?: boolean;
};

const Row = ({
  children,
  title,
  allowDragAndDrop = false,
}: PropsWithChildren<RowType>) => {
  console.log("allowDragAndDrop", allowDragAndDrop);
  return (
    <StyledRow role="listitem">
      <LeftContainer>
        {allowDragAndDrop && <DragHandleIcon />}
        <StyledTitle $isTextAlong={!allowDragAndDrop}>{title}</StyledTitle>
      </LeftContainer>
      <div>{children}</div>
    </StyledRow>
  );
};

export default Row;
