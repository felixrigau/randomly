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

const ICON_AND_TEXT_GAP = "0.5rem";

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: ${ICON_AND_TEXT_GAP};
`;
