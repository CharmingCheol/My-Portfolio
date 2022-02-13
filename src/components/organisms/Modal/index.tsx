import React, { useRef, ReactNode } from "react";

import Portal from "components/utils/Portal";
import { useAppSelector } from "store";

import ModalBackground from "./ModalBackground";
import ModalBody from "./ModalBody";
import ModalContent, { Props as ModalContentProps } from "./ModalContent";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

export interface Props extends ModalContentProps {
  children: ReactNode;

  modalKey: string;
}

const Modal = (props: Props) => {
  const { children, modalKey, autoClose } = props;

  const portalModalRef = useRef(document.getElementById("portal_modal"));

  const modalKeyState = useAppSelector((state) => state.globalUI.modalKey);

  if (modalKeyState !== modalKey) return null;

  return (
    <Portal container={portalModalRef}>
      <ModalBackground>
        <ModalContent autoClose={autoClose}>{children}</ModalContent>
      </ModalBackground>
    </Portal>
  );
};

export default Object.assign(Modal, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
});
