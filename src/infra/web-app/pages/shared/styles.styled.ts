import styled from "styled-components";

export const StyledFixedButtonContainer = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 0;
  width: 100%;
  display: flex;

  & > button {
    margin: auto;
  }
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #bebebe;
  background: #fafafa;
`;
