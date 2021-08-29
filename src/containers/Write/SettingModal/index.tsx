import React, { useCallback, useEffect, useRef } from "react";
import { postThumbnailImages } from "apis";
import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { useAppDispatch, useAppSelector } from "store";
import { updatePrevSettings, changeThumbnail, clearSettings, undoSettings } from "reducers/writeSlice";
import useApiRequest from "hooks/useApiRequest";
import defaultThumbnail from "static/img/skeleton.png";
import * as S from "./index.style";

interface ThumbnailResponse {
  url: string;
}

export interface Props {
  onHide: () => void;
  showedModal: boolean;
}

const SettingModal = (props: Props) => {
  const { onHide, showedModal } = props;
  const dispatch = useAppDispatch();
  const [thumbnailApi, thumbnailApiDispatch] = useApiRequest<ThumbnailResponse>(postThumbnailImages);
  const thumbnail = useAppSelector((state) => state.write.thumbnail);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  // 썸네일 업로드 클릭
  const handleThumbnailClick = useCallback(() => {
    thumbInputRef.current?.click();
  }, []);

  // 썸네일 이미지 변경
  const handleThumbInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const formData = new FormData();
      if (!fileList || !fileList[0].type.includes("image")) return;
      formData.append("thumbnail", fileList[0]);
      thumbnailApiDispatch({
        type: "REQUEST",
        requestData: {
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    },
    [thumbnailApiDispatch],
  );

  // 초기화 버튼 클릭
  const handleResetButtonClick = useCallback(() => {
    // setThumbnail(skeleton);
    dispatch(clearSettings());
  }, [dispatch]);

  // 확인 버튼 클릭
  const handleComfirmButtonClick = useCallback(() => {
    dispatch(updatePrevSettings({ prevThumbnail: thumbnail }));
    onHide();
  }, [dispatch, onHide, thumbnail]);

  // 취소 버튼 클릭
  const handleCancelButtonClick = useCallback(() => {
    dispatch(undoSettings());
    onHide();
  }, [dispatch, onHide]);

  // 썸네일 데이터 업데이트
  useEffect(() => {
    switch (thumbnailApi.type) {
      case "SUCCESS": {
        if (thumbnailApi.responseData) {
          dispatch(changeThumbnail(thumbnailApi.responseData?.url));
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [dispatch, thumbnailApi.responseData, thumbnailApi.type]);

  return (
    <Modal isOpened={showedModal}>
      <S.ModalWrapper>
        <S.ModalBody>
          <div
            className="thumbnail-preview"
            role="button"
            tabIndex={0}
            onClick={handleThumbnailClick}
            onKeyDown={() => {}}
          >
            <img src={thumbnail || defaultThumbnail} alt="thumbnail-preview" />
          </div>
          <input ref={thumbInputRef} className="thumbnail-input" type="file" onChange={handleThumbInputChange} />
        </S.ModalBody>
        <S.ModalFooter>
          <Button text="초기화" onClick={handleResetButtonClick} color="main_away" />
          <div className="right-buttons">
            <Button text="확인" onClick={handleComfirmButtonClick} />
            <Button text="취소" onClick={handleCancelButtonClick} color="main_away" />
          </div>
        </S.ModalFooter>
      </S.ModalWrapper>
    </Modal>
  );
};

export default SettingModal;
