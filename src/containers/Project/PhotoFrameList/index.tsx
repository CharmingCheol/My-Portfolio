import React, { memo } from "react";
import PhotoFrame from "@containers/Project/PhotoFrame";
import Art1 from "@containers/Project/Art1";
import Art2 from "@containers/Project/Art2";
import Art3 from "@containers/Project/Art3";
import * as S from "./style";

const PhotoFrameList = () => {
  const artLsit = [
    {
      component: Art1,
      className: "first-art",
      isFront: true,
    },
    {
      component: Art2,
      className: "second-art",
      isFront: true,
    },
    {
      component: Art3,
      className: "third-art",
      isFront: false,
    },
  ];

  return (
    <>
      <S.Layout>
        {artLsit.map((value) => {
          const { className, component, isFront } = value;
          return (
            <PhotoFrame key={className} className={className} isFront={isFront}>
              {component()}
            </PhotoFrame>
          );
        })}
      </S.Layout>
    </>
  );
};

export default memo(PhotoFrameList);
