/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { ImageCard } from "@common/Molecules/Card";
import useInterSection from "@hooks/useIntersection";
import { BoardDetail } from "@typings/db";
import * as S from "./style";

export interface MainCardListProps {
  cardList: BoardDetail[] | null;
}

const MainCardList = ({ cardList }: MainCardListProps) => {
  const [postLoading, setPostLoading] = useState(false);
  const ref = useInterSection<HTMLUListElement>(() => setPostLoading(true), { threshold: 0 });

  return (
    <>
      <S.Layout>
        <ul ref={ref}>
          {postLoading && cardList ? (
            cardList.length ? (
              cardList?.map((card) => {
                const { body, category, createdAt, thumbnail, title, _id } = card;
                return (
                  <ImageCard
                    key={title}
                    body={body}
                    category={category}
                    createdAt={createdAt}
                    image={thumbnail}
                    postId={_id}
                    title={title}
                  />
                );
              })
            ) : (
              <div />
            )
          ) : (
            Array(12)
              .fill(0)
              .map(() => (
                <S.SkeletonItem key={Math.random() * 10}>
                  <div className="container">
                    <div className="image" />
                    <div className="content-wrapper">
                      <div className="content" />
                      <div className="content" />
                      <div className="content" />
                    </div>
                  </div>
                </S.SkeletonItem>
              ))
          )}
        </ul>
      </S.Layout>
    </>
  );
};

export default MainCardList;
