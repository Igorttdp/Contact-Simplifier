import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

interface StyledInputProps {
  error?: FieldError;
  filled?: string;
  width?: string;
}

const StyledInput = styled.input<StyledInputProps>`
  color: #ffffff;
  background-color: #222426;
  padding: 1.6rem 4rem;
  font-size: 1.4rem;
  width: ${({ width }) => (!width ? "340px" : width)};
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  outline: 0;
  border: ${({ error, filled }) =>
    error
      ? "1px solid #BA0101"
      : filled
      ? "1px solid #008C62"
      : "1px solid transparent"};

  &::placeholder {
    color: #6b6b6b;
  }

  &:focus-visible {
    border-color: ${({ error, filled }) =>
      error ? " #ff5100" : filled ? "#00d495" : "#0093c1"};
  }

  &:-webkit-autofill {
    background-color: transparent !important;
  }
`;

export default StyledInput;
