import React from "react";
import { Link } from "react-router-dom";
import Date from "@common/Atoms/Date";
import Image from "@common/Atoms/Image";
import replaceMarkDownContent from "@utils/modules/replaceMarkDownContent";
import * as S from "./style";

/**
 * @param body 게시글 본문 부분
 * @param category 게시글의 카테고리. image alt에 사용
 * @param createdAt 게시글 생성일
 * @param image 게시글 대표 이미지
 * @param postId 게시글 ID
 * @param title 게시글 제목
 */
export interface CardProps {
  body: string;
  category: string;
  className?: string;
  createdAt: string;
  image: string;
  postId: string;
  title: string;
}

export const ImageCard = ({ body, category, className, createdAt, image, postId, title }: CardProps) => {
  return (
    <>
      <S.ImageCard className={className}>
        <Link to={`/blog/${postId}`}>
          <S.Container>
            <S.ImageWrapper>
              <Image alt={category} src={image} />
            </S.ImageWrapper>
            <S.ContentWrapper>
              <h1>{title}</h1>
              <Date dateText={createdAt} />
              <p>{replaceMarkDownContent(body)}</p>
            </S.ContentWrapper>
          </S.Container>
        </Link>
      </S.ImageCard>
    </>
  );
};
