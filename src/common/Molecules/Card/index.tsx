import React from "react";
import Date from "@common/Atoms/Date";
import Image from "@common/Atoms/Image";
import * as S from "./style";

/**
 * @param body 게시글 본문 부분
 * @param category 게시글의 카테고리. image alt에 사용
 * @param createdAt 게시글 생성일
 * @param image 게시글 대표 이미지
 * @param title 게시글 제목
 */
export interface CardProps {
  body: string;
  category: string;
  className?: string;
  createdAt: string;
  image: string;
  title: string;
}

export const ImageCard = ({ body, category, className, createdAt, image, title }: CardProps) => {
  return (
    <>
      <S.ImageCard className={className}>
        <S.Container>
          <S.ImageWrapper>
            <Image alt={category} src={image} />
          </S.ImageWrapper>
          <S.ContentWrapper>
            <h1>{title}</h1>
            <Date dateText={createdAt} />
            <p>{body}</p>
          </S.ContentWrapper>
        </S.Container>
      </S.ImageCard>
    </>
  );
};
