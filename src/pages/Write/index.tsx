import React, { useCallback, useLayoutEffect, useState } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from "components/atoms/Button";

const Write = () => {
  // const

  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        height: "100vh",
        initialEditType: "markdown",
        previewStyle: "vertical",
      });
      editor.getMarkdown();
    }
  }, []);

  return (
    <main>
      <input type="text" className="title-input" />
      <div id="editor" />
      <footer>
        <Button text="뒤로가기" />
      </footer>
    </main>
  );
};

export default Write;
