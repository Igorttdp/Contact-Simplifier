import { Trigger } from "@radix-ui/react-accordion";
import { styled } from "styled-components";

const CustomTrigger = styled(Trigger)`
  cursor: pointer;
  width: 100%;
  font-family: inherit;
  background-color: transparent;
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  line-height: 1;
  color: white;
  background-color: transparent;
  outline: 0;
  border: 1px solid #007da5;
  border-radius: 1rem;
  transition: all 0.3s;
  margin-bottom: 1rem;
  transition: all 0.3s;

  &:hover {
    background-color: #007da5;
    transition: all 0.3s;
  }

  &[data-state="open"] {
    background-color: #00bfff21;

    > svg {
      transition: all 0.3s;
      transform: rotate(180deg);
    }
  }

  &[data-state="closed"] > svg {
    transition: all 0.3s;
    transform: rotate(0deg);
  }
`;

export default CustomTrigger;
