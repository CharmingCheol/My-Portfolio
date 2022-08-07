import React, { useLayoutEffect } from "react";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Writing } from "types/writing";
import * as S from "./index.style";

interface Props {
  writing: Writing;
}

const WritingViewer = (props: Props) => {
  const { writing } = props;

  useLayoutEffect(() => {
    const editor = new Viewer({
      el: document.querySelector("#viewer") as HTMLDivElement,
      initialValue: writing.content,
    });
  }, [writing]);

  return <S.Viewer id="viewer" />;
};

export default WritingViewer;
