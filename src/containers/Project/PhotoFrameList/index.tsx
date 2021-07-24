import React, { memo, useContext } from "react";
import { projectContext } from "pages/Project/reducer";
import Art1 from "./Art1";
import Art2 from "./Art2";
import Art3 from "./Art3";
import CubePopup from "./CubePopup";
import PhotoFrame from "./PhotoFrame";
import * as S from "./style";

const PhotoFrameList = () => {
  const { togglePopup } = useContext(projectContext);

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
      {togglePopup && <CubePopup />}
    </>
  );
};

export default memo(PhotoFrameList);
