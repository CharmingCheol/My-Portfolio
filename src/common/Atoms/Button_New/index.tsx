import React, { memo } from "react";
import classnames from "classnames";
import { AttributeProps, EventProps, PathProps, StyleProps } from "./type";
import * as S from "./index.style";

export interface Props extends AttributeProps, EventProps, PathProps, StyleProps {
  /**
   * 버튼에 출력되는 icon
   */
  icon?: any;
  /**
   * 버튼에 출력되는 text
   */
  text?: string;
}

const Button = (props: Props) => {
  const { className = [], href, newTab, to, text, ...other } = props;

  if (to) {
    return (
      <S.Link className={classnames(...className)} to={to} {...other}>
        {text}
      </S.Link>
    );
  }
  if (href) {
    return (
      <S.Anchor className={classnames(...className)} href={href} target={newTab ? "_blank" : ""} {...other}>
        {text}
      </S.Anchor>
    );
  }
  return (
    <S.Button type="button" className={classnames(...className)} {...other}>
      {text}
    </S.Button>
  );
};

export default memo(Button);
