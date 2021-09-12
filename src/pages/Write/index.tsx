import React, { useCallback, useState, useLayoutEffect, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { postContentImages, postWriting } from "apis";
import useApiRequest from "hooks/useApiRequest";
import { useAppSelector } from "store";
import SettingModal from "containers/Write/SettingModal";
import Button from "components/atoms/Button";
import { Writing } from "types/writing";
import * as S from "./index.style";

interface LocationState {
  title: string;
  content: string;
}

const Write = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const thumbnail = useAppSelector((state) => state.write.thumbnail);
  const [postWritingApi, postWritingApiDispatch] = useApiRequest<Writing>(postWriting);
  const [title, setTitle] = useState(location.state.title || "");
  const [content, setContent] = useState("");
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [showedModal, setShowedModal] = useState(false);

  // 제목 인풋 입력
  const handleTitleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  // 환경설정 버튼 클릭
  const handleModalToggle = useCallback(() => {
    setShowedModal((prev) => !prev);
  }, []);

  // 뒤로가기 버튼 클릭
  const handleGoBackButtonClick = useCallback(() => {
    history.goBack();
  }, [history]);

  // 출간하기 버튼 클릭
  const handleSubmitButtonClick = useCallback(() => {
    postWritingApiDispatch({
      type: "REQUEST",
      requestData: {
        data: {
          content,
          title,
          thumbnail,
        },
      },
    });
  }, [content, postWritingApiDispatch, thumbnail, title]);

  // toast ui editor 적용
  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        initialEditType: "markdown",
        initialValue: location.state.content,
        height: "100%",
        previewStyle: "vertical",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            try {
              const formData = new FormData();
              formData.append("images", blob, (blob as File).name);
              const { data } = await postContentImages({ data: formData });
              const urlSplitting = data.url.split("/");
              const splitedLength = urlSplitting.length - 1;
              callback(data.url, urlSplitting[splitedLength]);
            } catch (error) {
              console.error(error);
            }
          },
        },
      });
      editor.on("change", () => {
        const htmlText = editor.getHTML();
        setContent(htmlText);
      });
    }
  }, [location.state.content]);

  // 글 작성 성공 시, 게시글 상세 페이지로 이동
  useEffect(() => {
    switch (postWritingApi.type) {
      case "SUCCESS": {
        if (postWritingApi.responseData) {
          const { id } = postWritingApi.responseData;
          history.replace(`/writing/${id}`);
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [history, postWritingApi.responseData, postWritingApi.type]);

  // 썸네일, 제목, 본문 체크 -> 모두 글이 있을 경우 출간하기 비활성화 해제
  useEffect(() => {
    if (thumbnail && title.trim() && content.trim()) setDisabledSubmitButton(false);
  }, [content, thumbnail, title]);

  return (
    <S.Layout>
      <S.TitleWrapper>
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력하세요"
          maxLength={100}
          onChange={handleTitleInputChange}
          value={title}
        />
      </S.TitleWrapper>
      <div id="editor" />
      <S.Footer>
        <Button text="뒤로가기" onClick={handleGoBackButtonClick} color="main_away" />
        <div className="right-buttons">
          <Button text="환경설정" onClick={handleModalToggle} color="main_away" />
          <Button text="출간하기" disabled={disabledSubmitButton} onClick={handleSubmitButtonClick} />
        </div>
      </S.Footer>
      <SettingModal onHide={handleModalToggle} showedModal={showedModal} />
    </S.Layout>
  );
};

export default Write;
