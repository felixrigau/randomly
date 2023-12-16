import styled from "styled-components";

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f6f6f6;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DRAG_AND_DROP_WIDTH_ICON = "1.5rem";
const ICON_AND_TEXT_GAP = "0.5rem";

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: ${ICON_AND_TEXT_GAP};

  & > svg {
    width: ${DRAG_AND_DROP_WIDTH_ICON};
  }
`;

export const StyledTitle = styled.p<{ $isTextAlong: boolean }>`
  padding-left: ${({ $isTextAlong }) =>
    $isTextAlong
      ? `calc(${DRAG_AND_DROP_WIDTH_ICON} + ${ICON_AND_TEXT_GAP})`
      : 0};
`;
