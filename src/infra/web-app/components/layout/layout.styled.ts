import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledMain = styled.main`
  display: flex;
  position: relative;
`;

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #bebebe;
  z-index: 2;
`;
