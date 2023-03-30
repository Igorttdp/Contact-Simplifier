import styled from "styled-components";

const CloseButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  background-image: url(close.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  transition: all 0.3s;
  position: absolute;
  top: 28px;
  right: 28px;
  outline: 0;
  border: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
`;

export default CloseButton;
