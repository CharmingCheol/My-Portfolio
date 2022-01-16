import React from "react";
import classnames from "classnames";
import { IconType } from "react-icons";
import { StyleProps } from "./type";
import * as S from "./index.style";

export interface Props extends Partial<StyleProps> {
  className?: string[];
  icon: IconType;
  onClick?: (params?: any) => void;
}

const Icon = (props: Props) => {
  const { className = ["icon-wrapper"], icon, onClick, ...other } = props;
  const IconComponent = icon;
  return (
    <S.Icon className={classnames(...className, onClick ? "icon-button" : "")} {...other}>
      <IconComponent role={onClick ? "button" : ""} onClick={onClick} />
    </S.Icon>
  );
};

export default Icon;
