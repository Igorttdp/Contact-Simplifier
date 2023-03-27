import styled from "styled-components";

const StyledInput = styled.input`
  color: #ffffff;
  background-color: #222426;
  padding: 1.6rem 4rem;
  font-size: 2rem;
  width: 430px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  outline: 0;
  border: 1px solid transparent;

  ::placeholder {
    background-color: #6b6b6b;
  }

  :focus-visible {
    border-color: #0093c1;
  }
`;

export default StyledInput;
