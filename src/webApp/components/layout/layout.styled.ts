import styled from "styled-components";
export const HEADER_HEIGHT = "4rem";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`;

export const StyledMain = styled.main`
  display: flex;
  position: relative;
  height: calc(100% - ${HEADER_HEIGHT});
  margin-top: ${HEADER_HEIGHT};
`;

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid #bebebe;
  z-index: 2;
`;
