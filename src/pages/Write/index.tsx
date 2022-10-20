import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { Writing } from "types/writing";

import WriteProvider, { writeActions, useWriteDispatch } from "./index.reducer";
import WriteHeader from "./write-header";
import WriteMarkdownEditor from "./write-markdown-editor";
import WriteFooter from "./write-footer";
import * as S from "./index.style";

const WritePage = () => {
  const location = useLocation<Writing>();
  const writeDispatch = useWriteDispatch();

  useLayoutEffect(() => {
    if (location.state) {
      writeDispatch(writeActions.initWriting(location.state));
    }
  }, []);

  return (
    <S.Layout>
      <WriteHeader />
      <WriteMarkdownEditor />
      <WriteFooter />
    </S.Layout>
  );
};

const WritePageWrapper = () => (
  <WriteProvider>
    <WritePage />
  </WriteProvider>
);

export default WritePageWrapper;
