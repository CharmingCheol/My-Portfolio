import React from "react";
import HashTag from "@common/Atoms/HashTag";
import * as S from "./style";

export interface HashTagListProps {
  className?: string;
  hashTagList: string[];
}

const HashTagList = ({ className, hashTagList }: HashTagListProps) => {
  return (
    <>
      <S.HashTagList className={className}>
        {hashTagList.map((hashTag) => (
          <HashTag key={hashTag} text={hashTag} />
        ))}
      </S.HashTagList>
    </>
  );
};

export default HashTagList;
