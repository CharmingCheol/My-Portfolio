import React, { useCallback, useState, useLayoutEffect, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { postContentImages } from "fireConfig/images";
import { patchWriting, postWriting } from "fireConfig/writings";
import { Writing } from "types/writing";

import Button from "components/atoms/Button";
import * as S from "./index.style";

const Write = () => {
  const history = useHistory();
  const location = useLocation<Partial<Writing>>();

  const [title, setTitle] = useState(location.state?.title || "");
  const [content, setContent] = useState(location.state?.content || "");
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

  // 제목 인풋 입력
  const handleTitleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  // 뒤로가기 버튼 클릭
  const handleGoBackButtonClick = useCallback(() => {
    history.goBack();
  }, [history]);

  // 출간하기 버튼 클릭
  const handleSubmitButtonClick = useCallback(async () => {
    const writingId = location.state?.id
      ? await patchWriting(location.state.id, { content, title })
      : await postWriting({ content, title });
    history.replace(`/writing/${writingId}`);
  }, [content, history, location.state, title]);

  // toast ui editor 적용
  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        initialEditType: "markdown",
        initialValue: location.state?.content || "",
        height: "100%",
        previewStyle: "vertical",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            try {
              const iamgeUrl = await postContentImages(blob as File);
              callback(iamgeUrl, "");
            } catch (error) {
              callback("", "");
            }
          },
        },
      });
      editor.on("change", () => {
        const markdownText = editor.getMarkdown();
        setContent(markdownText);
      });
    }
  }, [location.state]);

  // 썸네일, 제목, 본문 체크 -> 모두 글이 있을 경우 출간하기 비활성화 해제
  useEffect(() => {
    if (title.trim() && content.trim()) setDisabledSubmitButton(false);
  }, [content, title]);

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
        <Button onClick={handleGoBackButtonClick} color="main_away">
          뒤로가기
        </Button>
        <div className="right-buttons">
          <Button disabled={disabledSubmitButton} onClick={handleSubmitButtonClick}>
            출간하기
          </Button>
        </div>
      </S.Footer>
    </S.Layout>
  );
};

export default Write;
