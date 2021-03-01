import React, { useCallback, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import CategoryPostList from "@components/CategoryPost/CategoryPostList";
import PageNumberList from "@components/CategoryPost/PageNumberList";
import { getCategoryPosts, getCategoryPostCount } from "@apis/posts";
import { BoardDetail } from "@typings/db";
import logo from "@static/img/logo.png";
import * as S from "./style";

const CategoryPost = () => {
  const { category } = useParams<{ category: string }>();
  const [postCount, setPostCount] = useState(0);
  const [cardList, setCardList] = useState<BoardDetail[] | null>(null);

  // 페이지 번호, 이전, 다음 버튼 클릭
  const clickGetCategoryPosts = useCallback(
    async (page: number) => {
      try {
        const { data } = await getCategoryPosts({ category, page });
        setCardList(data);
      } catch {
        setCardList([]);
      }
    },
    [category],
  );

  // 최초 게시글 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { data } = await getCategoryPosts({ category, page: 1 });
        setCardList(data);
      } catch {
        setCardList([]);
      }
    };
    callback();
  }, [category]);

  // 카테고리에 속한 게시글 수 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { data } = await getCategoryPostCount({ category });
        setPostCount(data);
      } catch {
        setPostCount(0);
      }
    };
    callback();
  }, [category]);

  return (
    <>
      <S.Layout>
        <Helmet>
          <meta name="title" content="Charming Blog" />
          <meta name="description" content="차민철의 기술 블로그" />
          <meta name="og:title" content="Charming Blog" />
          <meta name="og:description" content="차민철의 기술 블로그" />
          <meta name="og:image" content={logo} />
          <title>{category} - Charming Blog</title>
        </Helmet>
        <CategoryPostList postList={cardList} />
        <PageNumberList onClick={clickGetCategoryPosts} postCount={postCount} />
      </S.Layout>
    </>
  );
};

export default CategoryPost;
