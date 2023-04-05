import { DialogContent } from "@radix-ui/react-dialog";
import styled from "styled-components";

const ModalContent = styled(DialogContent)`
  background-color: #333a41;
  border-radius: 6px;
  width: 90vw;
  max-width: 450px;
  height: 75rem;
  padding: 2.8rem 5.5rem;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;

    > h2 {
      font-size: 2.6rem;
    }

    div.tel {
      display: flex;
      flex-flow: column nowrap;
      gap: 1rem;
      width: 100%;

      span {
        font-size: 1.6rem;

        > span {
          color: #ff0000;
        }
      }
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
