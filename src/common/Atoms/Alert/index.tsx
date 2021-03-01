import React, { memo, useCallback, useContext, useEffect, useRef } from "react";
import { BsX } from "react-icons/bs";
import { AlertListContext } from "@reducers/AlertList";
import { removeAlert } from "@reducers/AlertList/action";
import * as S from "./style";

export interface AlertProps {
  className?: string;
  index: string;
  status: "success" | "error";
  text: string;
}

const Alert = ({ className, index, status, text }: AlertProps) => {
  const { dispatch } = useContext(AlertListContext);
  const timerID = useRef(0);

  const clickAlertExitBtn = useCallback(() => {
    dispatch(removeAlert(index));
  }, [dispatch, index]);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      dispatch(removeAlert(index));
    }, 3000);
    return () => clearTimeout(timerID.current);
  }, [dispatch, index]);

  return (
    <>
      <S.Alert className={className} status={status}>
        <span>{text}</span>
        <BsX onClick={clickAlertExitBtn} />
      </S.Alert>
    </>
  );
};

export default memo(Alert);
