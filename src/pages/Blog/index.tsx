import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import MainCardList from "@components/Blog/MainCardList";
import LoadMoreButton from "@components/Blog/LoadMoreButton";
import { getTotalPosts } from "@apis/posts";
import { BoardDetail } from "@typings/db";
import * as S from "./style";

const Blog = () => {
  const [cardListData, setCardListData] = useState<BoardDetail[][] | null>(null);
  const postCountRef = useRef(0);

  // [더 보기] 버튼 클릭
  const clickLoadMoreBtn = useCallback(async ({ page }: { page: number }) => {
    try {
      const { data } = await getTotalPosts({ page });
      postCountRef.current = data.length;
      setCardListData((prev) => [...(prev as BoardDetail[][]), [...data]]);
    } catch {
      setCardListData((prev) => prev);
    }
  }, []);

  // 최초 게시글 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { data } = await getTotalPosts({ page: 1 });
        postCountRef.current = data.length;
        setCardListData([[...data]]);
      } catch {
        setCardListData(null);
      }
    };
    callback();
  }, []);

  return (
    <>
      <S.Layout>
        {cardListData?.map((cardList, index) => (
          <MainCardList key={index.toString()} cardList={cardList} />
        ))}
        <LoadMoreButton postCount={postCountRef.current} onClick={clickLoadMoreBtn} />
      </S.Layout>
    </>
  );
};

export default Blog;
