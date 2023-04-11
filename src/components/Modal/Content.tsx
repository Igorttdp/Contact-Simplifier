import { DialogContent } from "@radix-ui/react-dialog";
import styled from "styled-components";

const ModalContent = styled(DialogContent)`
  background-color: #333a41;
  border-radius: 6px;
  width: 90vw;
  max-width: 450px;
  max-height: 75rem;
  height: 100%;
  padding: 2.8rem 5.5rem;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    padding: 2.5rem 1.5rem;
  }

  @media (max-width: 320px) {
    padding: 2.5rem 0.5rem;
  }

  @media (max-height: 750px) {
    height: 80vh;
  }

  form {
    width: 100%;
    height: 66.7rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
    overflow-y: auto;
    padding: 0 1rem;

    @media (max-height: 630px) {
      justify-content: flex-start;
    }

    > h2 {
      font-size: 2.6rem;
    }

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #222426;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #22272c;
    }
  }

  > div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    span {
      font-size: 3.5rem;
      font-weight: bold;
    }
  }
`;
export default ModalContent;
