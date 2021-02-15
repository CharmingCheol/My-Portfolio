import React, { memo, useContext } from "react";
import Alert from "@common/Atoms/Alert";
import { AlertListContext } from "@reducers/AlertList";
import * as S from "./style";

const AlertList = () => {
  const { alertList } = useContext(AlertListContext);

  return (
    <>
      <S.AlertList>
        {alertList.map((alert) => {
          const { text, status, index } = alert;
          return <Alert key={index} index={index} status={status} text={text} />;
        })}
      </S.AlertList>
    </>
  );
};

export default memo(AlertList);
