import React from "react";

import WriteHeader from "./write-header";
import WriteMarkdownEditor from "./write-markdown-editor";
import WriteFooter from "./write-footer";
import * as S from "./index.style";

const Write = () => {
  return (
    <S.Layout>
      <WriteHeader />
      <WriteMarkdownEditor />
      <WriteFooter />
    </S.Layout>
  );
};

export default Write;
