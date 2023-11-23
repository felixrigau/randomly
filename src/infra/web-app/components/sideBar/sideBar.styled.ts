import styled, { css } from "styled-components";

const open = css`
  transform: translateX(20px);
`;
const close = css`
  transform: translateX(100vw);
`;

export const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  transform: translateX(100vw);
  background-color: red;
  height: 100vh;
  width: 100vw;
  transition: transform 0.5s;
  ${({ isOpen }) => (isOpen ? open : close)}
`;
