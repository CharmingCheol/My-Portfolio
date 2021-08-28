import React, { useCallback, useRef, useState, useLayoutEffect, useEffect } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { postImages, postThumbnailImages } from "apis";
import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { useApiRequest } from "hooks";
import skeleton from "static/img/skeleton.png";

interface ThumbnailResponse {
  url: string;
}

const Write = () => {
  const [thumbnailResponse, dispatch] = useApiRequest<ThumbnailResponse>(postThumbnailImages);
  const [showedModal, setShowedModal] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const thumbInputRef = useRef<HTMLInputElement>(null);

  // 환경설정 버튼 클릭
  const handleSettingButtonClick = useCallback(() => {
    setShowedModal(true);
  }, []);

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

  // toast ui editor 적용
  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        height: "100vh",
        initialEditType: "markdown",
        previewStyle: "vertical",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            try {
              const formData = new FormData();
              formData.append("images", blob, (blob as File).name);
              const imageResponse = await postImages({ data: formData });
              const urlSplitting = imageResponse.data.url.split("/");
              const splitedLength = urlSplitting.length - 1;
              callback(imageResponse.data.url, urlSplitting[splitedLength]);
            } catch (error) {
              console.error(error);
            }
          },
        },
      });
    }
  }, []);

  // 썸네일 업로드 성공 및 실패 처리
  useEffect(() => {
    switch (thumbnailResponse.type) {
      case "SUCCESS": {
        if (thumbnailResponse.responseData) {
          setThumbnail(thumbnailResponse.responseData.url);
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [thumbnailResponse.responseData, thumbnailResponse.type]);

  return (
    <main>
      <input type="text" className="title-input" />
      <div id="editor" />
      <footer>
        <Button text="뒤로가기" />
        <Button text="환경설정" onClick={handleSettingButtonClick} />
      </footer>
      <Modal isOpened={showedModal}>
        <div
          className="thumbnail-preview"
          role="button"
          tabIndex={0}
          onClick={handleThumbnailClick}
          onKeyDown={() => {}}
        >
          <img src={thumbnail || skeleton} alt="thumbnail-preview" />
        </div>
        <input ref={thumbInputRef} className="thumbnail-input" type="file" onChange={handleThumbInputChange} />
      </Modal>
    </main>
  );
};

export default Write;
