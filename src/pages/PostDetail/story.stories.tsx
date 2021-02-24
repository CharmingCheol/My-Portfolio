import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react/types-6-0";
import { text, array } from "@storybook/addon-knobs";
import PostDetailHeader from "@components/PostDetail/PostDetailHeader";
import PostDetailContent from "@components/PostDetail/PostDetailContent";
import * as S from "./style";

export default {
  title: "pages/PostDetail",
} as Meta;

// Default PostDetail Page
const DefaultTemplate = () => {
  return (
    <>
      <MemoryRouter>
        <S.Layout>
          <PostDetailHeader
            date={text("date", "2021-02-20")}
            deletePostDetail={() => {}}
            hashTagList={array("hashTagList", ["React"])}
            title={text("title", "제목입니다")}
          />
          <PostDetailContent body={text("body", "본문입니다")} />
        </S.Layout>
      </MemoryRouter>
    </>
  );
};
export const DefaultPostDetailPage = DefaultTemplate.bind({});

// skeleton
const SkeletonTemplate = () => {
  return (
    <S.Layout>
      <S.Skeleton>
        <div className="header">
          <div className="title" />
          <div className="date" />
          <div className="hashtag-list">
            <div className="hashtag" />
            <div className="hashtag" />
            <div className="hashtag" />
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content" />
          <div className="content" />
          <div className="content" />
          <div className="content" />
          <div className="content" />
          <div className="content" />
        </div>
      </S.Skeleton>
    </S.Layout>
  );
};
export const SkeletonPostDetailPage = SkeletonTemplate.bind({});
