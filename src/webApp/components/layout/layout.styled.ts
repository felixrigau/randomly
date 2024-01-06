import styled from "styled-components";
import { FOOTER_HEIGHT } from "../../shared/styles/constants";
export const HEADER_HEIGHT = "5rem";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`;

export const StyledMain = styled.main`
  display: flex;
  position: relative;
  height: calc(100% - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
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
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #bebebe;
  z-index: 2;
`;
export const StyledFooter = styled.header`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${FOOTER_HEIGHT};
  background-color: #f1f1f1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  padding: 1rem 0;
  border-top: 1px solid #bebebe;
  z-index: 2;

  & > button {
    border-left: 1px solid #bebebe;
  }

  & > button:first-child {
    border-left: none;
  }
`;
