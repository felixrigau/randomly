import styled from "styled-components";

export const StyledItem = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
`;

export const StyledTitle = styled.p`
  font-size: 3rem;
`;

export const StyledMessage = styled.p`
  font-size: 1.5rem;
`;

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledText = styled.p<{ isOpen: boolean }>`
  transform: scaleY(${({ isOpen }) => (isOpen ? "1" : "0")});
  transition: transform 0.5s;
`;

export const StyledIconWrapper = styled.p<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: rotate 0.5s;
`;
