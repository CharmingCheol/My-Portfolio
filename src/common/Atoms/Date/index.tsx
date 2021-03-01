import React from "react";
import * as S from "./style";

/**
 * @param bold Date 텍스트 굵기(true면 bold)
 * @param className Date 컴포넌트 클래스 이름
 * @param dateText Date 텍스트(required)
 * @param fontColor Date 텍스트 색상(default=black)
 * @param fontSize Date 텍스트 크기(default=1)
 */

export interface DateProps {
  bold?: boolean;
  className?: string;
  dateText: string;
  fontColor?: string;
  fontSize?: number;
}

const Date = ({ className, dateText, fontColor = "black", fontSize = 1, bold = false }: DateProps) => {
  return (
    <>
      <S.Date bold={bold} className={className} fontColor={fontColor} fontSize={fontSize}>
        {dateText.slice(0, 10)}
      </S.Date>
    </>
  );
};

export default Date;
