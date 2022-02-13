import React, { memo, ReactNode } from "react";

import * as S from "./index.style";

interface Props {
  children: ReactNode;
}

const ModalHeader = (props: Props) => {
  const { children } = props;

  return <S.Header>{children}</S.Header>;
};

export default memo(ModalHeader);
