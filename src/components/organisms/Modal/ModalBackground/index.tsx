import React, { ReactNode } from "react";

import * as S from "./index.style";

interface Props {
  children: ReactNode;
}

const ModalBackground = (props: Props) => {
  const { children } = props;

  return <S.Background>{children}</S.Background>;
};

export default ModalBackground;
