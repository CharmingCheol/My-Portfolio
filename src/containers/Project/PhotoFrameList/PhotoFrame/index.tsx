import React, { useCallback, useContext } from "react";
import { projectContext } from "pages/Project/reducer";
import { clickPhotoFrameAction } from "pages/Project/action";
import * as S from "./style";

export interface PhotoFrameProps {
  children?: React.ReactNode;
  className: string;
  isFront: boolean;
}

const PhotoFrame = ({ children, className, isFront }: PhotoFrameProps) => {
  const { dispatch } = useContext(projectContext);

  const clickPhotoFrame = useCallback(() => {
    dispatch(clickPhotoFrameAction(className));
  }, [className, dispatch]);

  return (
    <>
      <S.Layout className={className} onClick={clickPhotoFrame}>
        <div className="art art-front">{isFront && children}</div>
        <div className="art art-back">{!isFront && children}</div>
        <div className="art art-left" />
        <div className="art art-top" />
        <div className="art art-bottom" />
      </S.Layout>
    </>
  );
};

export default PhotoFrame;
