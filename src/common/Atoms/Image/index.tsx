import React, { useState } from "react";
import SkeletonImage from "@static/img/skeletonImage.png";
import useInterSection from "@hooks/useIntersection";
import * as S from "./style";

/**
 * @param alt 이미지 에러가 발생할 때 대체로 보여지는 텍스트
 * @param lazy lazy loading 적용 여부(default=false. true면 적용)
 * @param onClick 이미지 클릭 이벤트
 * @param src 이미지 경로
 */

export interface ImageProps {
  alt: string;
  className?: string;
  lazy?: boolean;
  onClick?: () => void;
  src: string;
}

const Image = ({ alt, className, lazy = false, onClick, src }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(lazy ? SkeletonImage : src);
  const ref = useInterSection(() => setImgSrc(src));

  return (
    <>
      <S.Image alt={alt} className={className} onClick={onClick} ref={lazy ? ref : null} src={imgSrc} />
    </>
  );
};

export default Image;
