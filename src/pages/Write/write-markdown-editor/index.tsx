import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { HookCallback } from "@toast-ui/editor/types/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { ImagesApiSend } from "apis/send";
import { useWriteDispatch, useWriteSelector, writeActions } from "pages/Write/index.reducer";
import { fileValidator } from "services";

const WriteMarkdownEditor = () => {
  const editorRef = useRef<Editor>(null);
  const content = useWriteSelector((state) => state.writing.content);
  const writeDispatch = useWriteDispatch();

  const handleChangeEditorText = () => {
    const markdownText = editorRef.current?.getInstance().getMarkdown();
    if (markdownText) {
      writeDispatch(writeActions.changeContent(markdownText));
    }
  };

  const addImageBlobHook = async (file: File, callback: HookCallback) => {
    if (fileValidator.isImageFile(file.name)) {
      const response = await ImagesApiSend.uploadWritingContent(file);
      callback(response.data.path);
    }
  };

  return (
    <Editor
      initialEditType="markdown"
      initialValue={content}
      height="100%"
      previewStyle="vertical"
      ref={editorRef}
      onChange={handleChangeEditorText}
      hooks={{ addImageBlobHook: addImageBlobHook as any }}
    />
  );
};

export default WriteMarkdownEditor;
