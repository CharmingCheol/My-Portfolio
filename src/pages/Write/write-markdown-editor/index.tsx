import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { HookCallback } from "@toast-ui/editor/types/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { ImagesApiSend } from "apis/send";
import { useWriteDispatch, writeActions } from "pages/Write/index.reducer";
import { fileValidator } from "services";
import { Writing } from "types/writing";

const WriteMarkdownEditor = () => {
  const editorRef = useRef<Editor>(null);
  const location = useLocation<Writing>();
  const writeDispatch = useWriteDispatch();

  const handleChangeEditorText = () => {
    const markdownText = editorRef.current?.getInstance().getMarkdown();
    if (markdownText) {
      writeDispatch(writeActions.changeContent(markdownText));
    }
  };

  const handleClickInsertImageButton = async (file: File, callback: HookCallback) => {
    if (fileValidator.isImageFile(file.name)) {
      const response = await ImagesApiSend.uploadWritingContent(file);
      callback(response.data.path);
    }
  };

  return (
    <Editor
      initialEditType="markdown"
      initialValue={location.state?.content}
      height="100%"
      previewStyle="vertical"
      ref={editorRef}
      onChange={handleChangeEditorText}
      hooks={{ addImageBlobHook: handleClickInsertImageButton as any }}
    />
  );
};

export default WriteMarkdownEditor;
