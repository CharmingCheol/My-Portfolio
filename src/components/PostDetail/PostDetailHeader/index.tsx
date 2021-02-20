import React from "react";
import Date from "@common/Atoms/Date";
import HashTagList from "@common/Molecules/HashTagList";
import * as S from "./style";

export interface PostDetailHeaderProps {
  date: string;
  hashTagList: string[];
  title: string;
}

const PostDetailHeader = ({ date, hashTagList, title }: PostDetailHeaderProps) => {
  return (
    <>
      <S.Layout>
        <h1>{title}</h1>
        <Date dateText={date} />
        <HashTagList hashTagList={hashTagList} />
      </S.Layout>
    </>
  );
};

export default PostDetailHeader;
