import { DialogOverlay } from "@radix-ui/react-dialog";
import styled from "styled-components";

const ModalOverlay = styled(DialogOverlay)`
  background-color: rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default ModalOverlay;
