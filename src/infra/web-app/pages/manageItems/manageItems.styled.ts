import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 2rem;
  position: relative;
  height: auto;
  width: 100vw;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid #bebebe;

  & :first-child {
    margin-right: 0.5rem;
  }
  & :last-child {
    margin-left: 0.5rem;
  }
`;

export const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 0.5rem;
`;

export const StyledActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type StyledPinButtonType = {
  $isFixed: boolean;
};

export const StyledPinButton = styled(StyledActionButton)<StyledPinButtonType>`
  & > svg {
    transform: rotate(45deg);
    background: ${({ $isFixed }) => ($isFixed ? "#e0e0e0" : "transparent")};
    border-radius: 50%;
    padding: 0.25rem;
  }
`;
