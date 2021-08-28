import React, { useCallback, useEffect, useRef, useState } from "react";
import { postThumbnailImages } from "apis";
import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import useApiRequest from "hooks/useApiRequest";
import skeleton from "static/img/skeleton.png";

interface ThumbnailResponse {
  url: string;
}

interface Props {
  onHide: () => void;
  showedModal: boolean;
}

const SettingModal = (props: Props) => {
  const { onHide, showedModal } = props;
  const [thumbnailApi, dispatch] = useApiRequest<ThumbnailResponse>(postThumbnailImages);
  const [thumbnail, setThumbnail] = useState(skeleton);
  const [prevThumbnail, setPrevThumbnail] = useState(skeleton);
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
      dispatch({
        type: "REQUEST",
        requestData: {
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    },
    [dispatch],
  );

  // 초기화 버튼 클릭
  const handleResetButtonClick = useCallback(() => {
    setThumbnail(skeleton);
  }, []);

  // 확인 버튼 클릭
  const handleComfirmButtonClick = useCallback(() => {
    onHide();
    setPrevThumbnail(thumbnail);
  }, [onHide, thumbnail]);

  // 취소 버튼 클릭
  const handleCancelButtonClick = useCallback(() => {
    onHide();
    setThumbnail(prevThumbnail);
  }, [onHide, prevThumbnail]);

  // 썸네일 데이터 업데이트
  useEffect(() => {
    switch (thumbnailApi.type) {
      case "SUCCESS": {
        setThumbnail(thumbnailApi.responseData?.url);
        break;
      }
      default: {
        break;
      }
    }
  }, [thumbnailApi.responseData, thumbnailApi.type]);

  return (
    <Modal isOpened={showedModal}>
      <div className="thumbnail-preview" role="button" tabIndex={0} onClick={handleThumbnailClick} onKeyDown={() => {}}>
        <img src={thumbnail} alt="thumbnail-preview" />
      </div>
      <input ref={thumbInputRef} className="thumbnail-input" type="file" onChange={handleThumbInputChange} />
      <Button text="초기화" onClick={handleResetButtonClick} />
      <Button text="확인" onClick={handleComfirmButtonClick} />
      <Button text="취소" onClick={handleCancelButtonClick} />
    </Modal>
  );
};

export default SettingModal;
