import React from "react";
import * as S from "./style";

export interface ModalProps {
  children: React.ReactNode;
  containerClassName?: string;
  modalClassName?: string;
}

const Modal = ({ children, containerClassName = "", modalClassName = "" }: ModalProps) => {
  return (
    <>
      <S.Modal className={`modal ${modalClassName}`}>
        <S.Container className={`modal-container ${containerClassName}`}>{children}</S.Container>
      </S.Modal>
    </>
  );
};

export default Modal;
