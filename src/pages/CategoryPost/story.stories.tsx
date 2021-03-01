import React, { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react/types-6-0";
import { number } from "@storybook/addon-knobs";
import CategoryPostList from "@components/CategoryPost/CategoryPostList";
import PageNumberList from "@components/CategoryPost/PageNumberList";
import { BoardDetail } from "@typings/db";
import dummy from "./dummy.json";
import * as S from "./style";

export default {
  title: "pages/CategoryPost",
} as Meta;

// CategoryPost Page
const Template = () => {
  const [cardList, setCardList] = useState<BoardDetail[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setCardList(dummy);
    }, 3000);
  }, []);

  return (
    <>
      <MemoryRouter>
        <S.Layout>
          <CategoryPostList postList={cardList} />
          <PageNumberList onClick={() => {}} postCount={number("postsCount", 1)} />
        </S.Layout>
      </MemoryRouter>
    </>
  );
};
export const CategoryPostPage = Template.bind({});

// Skeleton
const SkeletonTemplate = () => {
  return (
    <>
      <MemoryRouter>
        <S.Layout>
          <CategoryPostList postList={null} />
          <PageNumberList onClick={() => {}} postCount={number("postsCount", 0)} />
        </S.Layout>
      </MemoryRouter>
    </>
  );
};
export const SkeletonCategoryPostPage = SkeletonTemplate.bind({});
