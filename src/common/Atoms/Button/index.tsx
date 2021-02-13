import React from "react";
import palette from "@utils/styles/palette";
import * as S from "./style";

/**
 * @param buttonColor 버튼 색상
 * @param className 추가적인 버튼 classname
 * @param disabled 버튼 비활성화 여부
 * @param disabledColor 버튼 비활성화 색상
 * @param onClick 버튼을 클릭했을 때 실행되는 함수
 * @param type 버튼의 type
 */

export interface ButtonProps {
  buttonColor?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  disabledColor?: string;
  onClick?: () => void;
  type?: "submit" | "button";
}

const Button = ({
  buttonColor = palette.green5,
  children,
  className,
  disabled,
  disabledColor = palette.green3,
  onClick,
  type,
}: ButtonProps) => {
  // 링크형 버튼이 아닐 경우
  return (
    <>
      <S.Button
        buttonColor={buttonColor}
        className={className}
        disabled={disabled}
        disabledColor={disabledColor}
        onClick={onClick}
        type={type}
      >
        {children}
      </S.Button>
    </>
  );
};

export default Button;
