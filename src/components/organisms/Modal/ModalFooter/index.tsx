import React, { memo, ReactNode } from "react";

import * as S from "./index.style";

interface Props {
  children: ReactNode;
}

const ModalFooter = (props: Props) => {
  const { children } = props;

  return <S.Footer>{children}</S.Footer>;
};

export default memo(ModalFooter);
