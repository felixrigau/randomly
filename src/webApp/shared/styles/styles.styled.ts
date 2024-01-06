import styled from "styled-components";
import { FOOTER_HEIGHT } from "./constants";

export const StyledFixedButtonContainer = styled.div`
  position: fixed;
  bottom: calc(3rem + ${FOOTER_HEIGHT});
  left: 0;
  width: 3rem;
  display: flex;
  left: 50%;
  transform: translateX(-50%);

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
