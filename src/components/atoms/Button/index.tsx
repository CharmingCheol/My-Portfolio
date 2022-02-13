import React, { memo, ButtonHTMLAttributes } from "react";

import * as S from "./index.style";

export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">, S.StyleProps {
  children: React.ReactNode;
}

const Button = (props: Props) => {
  const { children, disabled, ...others } = props;

  return (
    <S.Button type="button" disabled={disabled} {...others}>
      {children}
    </S.Button>
  );
};

export default memo(Button);
