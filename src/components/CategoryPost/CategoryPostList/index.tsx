import React from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "@common/Molecules/CategoryCard";
import { BoardDetail } from "@typings/db";
import * as S from "./style";

export interface CategoryPostListProps {
  postList: BoardDetail[] | null;
}

const CategoryPostList = ({ postList }: CategoryPostListProps) => {
  const { category: categoryTitle } = useParams<{ category: string }>();

  return (
    <>
      <S.Layout>
        {postList ? (
          <>
            <h1>{categoryTitle}</h1>
            <ul>
              {postList.map((post) => {
                const { category, created_at, _id, title } = post;
                return <CategoryCard key={title} category={category} date={created_at} id={_id} title={title} />;
              })}
            </ul>
          </>
        ) : (
          Array(12)
            .fill(0)
            .map((_, index) => (
              <S.Skeleton key={index.toString()}>
                <div className="title" />
                <div className="date" />
              </S.Skeleton>
            ))
        )}
      </S.Layout>
    </>
  );
};

export default CategoryPostList;
