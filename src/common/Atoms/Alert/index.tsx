import React from "react";
import { BsX } from "react-icons/bs";
import * as S from "./style";

export interface AlertProps {
  className?: string;
  onClick: () => void;
  status: "success" | "error";
  text: string;
}

const Alert = ({ className, onClick, status, text }: AlertProps) => {
  return (
    <>
      <S.Alert className={className} onClick={onClick} status={status}>
        <span>{text}</span>
        <BsX />
      </S.Alert>
    </>
  );
};

export default Alert;
