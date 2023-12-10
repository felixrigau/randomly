import styled from "styled-components";

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;

  & > input,
  & > textarea {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #aeaeae;
  }

  & > label:first-child {
    margin-top: 0;
  }

  & > label {
    margin-top: 0.75rem;
  }

  & #isFixed {
    margin-right: 0.5rem;
  }
`;
