import styled, { css } from "styled-components";

const open = css`
  transform: translateX(20px);
`;
const close = css`
  transform: translateX(100vw);
`;

export const Background = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #003feacf;
  height: 100vh;
  width: 100vw;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

export const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  transform: translateX(100vw);
  background-color: #ffd8f6;
  height: 100vh;
  width: 100vw;
  padding: 16px;
  transition: transform 0.5s;
  ${({ $isOpen }) => ($isOpen ? open : close)}
`;
