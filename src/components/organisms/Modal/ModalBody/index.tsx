import React, { memo, ReactNode } from "react";

import * as S from "./index.style";

interface Props {
  children: ReactNode;
}

const ModalBody = (props: Props) => {
  const { children } = props;

  return <S.Body>{children}</S.Body>;
};

export default memo(ModalBody);
