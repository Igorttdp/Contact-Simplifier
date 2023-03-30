import * as Dialog from "@radix-ui/react-dialog";
import ModalOverlay from "./Overlay";
import React, { ReactNode } from "react";
import ModalContent from "./Content";
import CloseButton from "../CloseButton";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, open, setOpen }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <ModalOverlay>
          <ModalContent>
            {children}
            <Dialog.Close asChild>
              <CloseButton />
            </Dialog.Close>
          </ModalContent>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
