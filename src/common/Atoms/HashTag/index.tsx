import React from "react";
import * as S from "./style";

export interface HashTagProps {
  className?: string;
  text: string;
}

const HashTag = ({ className, text }: HashTagProps) => {
  return (
    <>
      <S.HashTag className={className}>{text}</S.HashTag>
    </>
  );
};

export default HashTag;
