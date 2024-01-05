import styled from "styled-components";

export const StyledBackground = styled.div`
  background: #0442aed1;
  width: 100vw;
  height: ${window.innerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;
export const StyledModal = styled.div`
  background: #fff;
`;

export const StyledModalContent = styled.div`
  padding: 2rem;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledHeaderContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f6f6f6;
`;
