import { PropsWithChildren } from "react";
import { LeftContainer, StyledRow } from "./row.styled";

type RowType = {
  title: string;
};

const Row = ({ children, title }: PropsWithChildren<RowType>) => {
  return (
    <StyledRow role="listitem" onDrag={(ev) => console.log("ev", ev)}>
      <LeftContainer>
        <p>{title}</p>
      </LeftContainer>
      <div>{children}</div>
    </StyledRow>
  );
};

export default Row;
// comment
