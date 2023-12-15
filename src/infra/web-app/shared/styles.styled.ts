import styled from "styled-components";

export const StyledFixedButtonContainer = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 0;
  width: 100%;
  display: flex;

  & > button {
    margin: auto;
    background-color: rgb(0 56 255 / 35%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #bebebe;
  background: #fafafa;
`;
