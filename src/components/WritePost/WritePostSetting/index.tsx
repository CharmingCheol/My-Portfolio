import React, { useCallback, useContext, useEffect, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import Button from "@common/Atoms/Button";
import Image from "@common/Atoms/Image";
import { WritePostContext } from "@reducers/WritePost";
import { changeThumbnail } from "@reducers/WritePost/action";
import initialThumbnail from "@static/img/skeletonImage.png";
import * as S from "./style";

const WritePostSetting = () => {
  const { dispatch, imageList, thumbnail } = useContext(WritePostContext);
  const [tempThumbnail, setTempThumbnail] = useState(thumbnail || initialThumbnail);
  const [toggleContainer, setToggleContainer] = useState(false);

  // 썸네일 후보 이미지 클릭
  const clickThumbnailCandidate = useCallback((image: string) => {
    setTempThumbnail(image);
  }, []);

  // 적용하기 버튼 클릭
  const clickSaveBtn = useCallback(() => {
    dispatch(changeThumbnail(tempThumbnail));
    setToggleContainer((prev) => !prev);
  }, [dispatch, tempThumbnail]);

  // 설정 화면 출력하기 토글
  const clickSettingBtn = useCallback(() => {
    setToggleContainer((prev) => !prev);
  }, []);

  // 썸네일 초기화
  useEffect(() => {
    if (!toggleContainer) setTempThumbnail(thumbnail || initialThumbnail);
  }, [thumbnail, toggleContainer]);

  return (
    <>
      <S.Layout>
        {toggleContainer && (
          <S.SettingBackground>
            <S.SettingContainer>
              <div>
                <h1>썸네일</h1>
                <S.ThumbnailWrapper>
                  <img className="thumbnail" alt="썸네일" src={tempThumbnail} />
                  <div className="image-list">
                    {imageList.map((image, index) => (
                      <Image
                        key={index.toString()}
                        alt="썸네일 후보 리스트"
                        onClick={() => clickThumbnailCandidate(image)}
                        src={image}
                      />
                    ))}
                  </div>
                </S.ThumbnailWrapper>
              </div>
              <S.BottomButtonWrapper>
                <Button className="back-btn" onClick={clickSettingBtn}>
                  뒤로가기
                </Button>
                <Button className="save-btn" onClick={clickSaveBtn}>
                  적용하기
                </Button>
              </S.BottomButtonWrapper>
            </S.SettingContainer>
          </S.SettingBackground>
        )}
        <BsFillGearFill className="gear-icon" onClick={clickSettingBtn} />
      </S.Layout>
    </>
  );
};

export default WritePostSetting;
