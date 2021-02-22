import React from "react";
import { Link, useParams } from "react-router-dom";
import Date from "@common/Atoms/Date";
import HashTagList from "@common/Molecules/HashTagList";
import * as S from "./style";

export interface PostDetailHeaderProps {
  date: string;
  hashTagList: string[];
  title: string;
}

const PostDetailHeader = ({ date, hashTagList, title }: PostDetailHeaderProps) => {
  const { category, id } = useParams<{ category: string; id: string }>();

  return (
    <>
      <S.Layout>
        <h1>{title}</h1>
        <div className="date-wrapper">
          <Date dateText={date} className="created-at" />
          <Link className="modify-btn" to={`/blog/write/post?id=${id}&category=${category}`}>
            수정
          </Link>
          <span className="delete-btn">삭제</span>
        </div>
        <HashTagList hashTagList={hashTagList} />
      </S.Layout>
    </>
  );
};

export default PostDetailHeader;
