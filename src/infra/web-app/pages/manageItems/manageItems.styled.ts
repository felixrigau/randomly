import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 2rem;
  position: relative;
  height: 100vh;
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
