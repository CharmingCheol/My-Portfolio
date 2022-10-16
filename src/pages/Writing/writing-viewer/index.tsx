import React from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useWritingSelector } from "pages/Writing/index.reducer";

import * as S from "./index.style";

const WritingViewer = () => {
  const writingContent = useWritingSelector((state) => state.writingDetail.content);

  return (
    <S.Wrapper>
      <Viewer initialValue={writingContent} />
    </S.Wrapper>
  );
};

export default WritingViewer;
