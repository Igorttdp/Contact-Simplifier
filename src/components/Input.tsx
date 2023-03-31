import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";

interface StyledInputProps {
  error?: FieldError | string;
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

  &:disabled {
    cursor: not-allowed;
    background-color: #4624246c;
    border-color: #922424;

    &::placeholder {
      color: #8d8d8d;
    }
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #222426 inset;
    box-shadow: 0 0 0px 1000px #222426 inset;
    font-family: "Inter";
    font-size: 1.4rem;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-moz-autofill {
    -moz-text-fill-color: #ffffff;
  }
`;

export default StyledInput;
