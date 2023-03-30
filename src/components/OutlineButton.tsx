import { ReactNode } from "react";
import styled from "styled-components";

interface IOutlineButtonProps {
  mode?: string;
  width?: string;
}

const OutlineButton = styled.button<IOutlineButtonProps>`
  cursor: pointer;
  width: ${({ width }) => (width ? width : "100%")};
  color: #ffffff;
  background-color: transparent;
  border: ${({ mode }) =>
    mode === "normal"
      ? "1px solid #007DA5"
      : mode === "sucess"
      ? "1px solid #008c62"
      : "1px solid #BA0101"};
  font-size: 1.6rem;
  padding: 1.2rem 1rem;
  border-radius: 0.4rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ mode }) =>
      mode === "normal"
        ? "#007DA5"
        : mode === "sucess"
        ? "#008c62"
        : "#BA0101"};
    transition: all 0.3s;
  }
`;

export default OutlineButton;
