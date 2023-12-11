import styled, { css } from "styled-components";

const open = css`
  transform: translateX(20px);
`;
const close = css`
  transform: translateX(100vw);
`;

export const StyledSideBar = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 2;
`;

export const StyledBackground = styled.div<{ $isOpen: boolean }>`
  background-color: #003feacf;
  height: inherit;
  width: 100vw;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

export const StyledContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  transform: translateX(100vw);
  background-color: #ffd8f6;
  height: inherit;
  width: 100vw;
  padding: 16px;
  transition: transform 0.5s;
  ${({ $isOpen }) => ($isOpen ? open : close)}
`;
