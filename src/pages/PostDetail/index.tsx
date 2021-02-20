import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetailHeader from "@components/PostDetail/PostDetailHeader";
import PostDetailContent from "@components/PostDetail/PostDetailContent";
import { getPostDetail } from "@apis/posts";
import { BoardDetail } from "@typings/db";
import * as S from "./style";

const PostDetail = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [postDetailData, setPostDetailData] = useState<BoardDetail | null>(null);

  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { data } = await getPostDetail({ category, id });
        setPostDetailData(data);
      } catch {
        setPostDetailData(null);
      }
    };
    callback();
  }, [category, id]);

  return (
    <>
      <S.Layout>
        {postDetailData ? (
          <>
            <PostDetailHeader
              date={postDetailData.created_at}
              hashTagList={postDetailData.hashtag}
              title={postDetailData.title}
            />
            <PostDetailContent body={postDetailData.body} />
          </>
        ) : (
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
        )}
      </S.Layout>
    </>
  );
};

export default PostDetail;
