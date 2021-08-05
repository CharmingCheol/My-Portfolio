import React, { memo } from "react";
import { IconType } from "react-icons";
import classnames from "classnames";
import Icon from "components/atoms/Icon";
import { AttributeProps, EventProps, PathProps, StyleProps } from "./type";
import * as S from "./index.style";

export interface Props extends AttributeProps, EventProps, PathProps, StyleProps {
  /**
   * 버튼에 출력되는 icon
   */
  icon?: IconType;

  /**
   * 버튼에 출력되는 text
   */
  text?: string;
}

const Button = (props: Props) => {
  const { className = [], href, icon, newTab, to, text, ...others } = props;
  const classNameAttr = classnames(...className, { "with-icon": !!icon });

  if (to) {
    return (
      <S.Link className={classNameAttr} to={to} {...others}>
        {icon && <Icon icon={icon} />}
        {text}
      </S.Link>
    );
  }
  if (href) {
    return (
      <S.Anchor className={classNameAttr} href={href} target={newTab ? "_blank" : ""} {...others}>
        {icon && <Icon icon={icon} />}
        {text}
      </S.Anchor>
    );
  }
  return (
    <S.Button type="button" className={classNameAttr} {...others}>
      {icon && <Icon icon={icon} />}
      {text}
    </S.Button>
  );
};

export default memo(Button);
