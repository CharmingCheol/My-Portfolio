import React, { useLayoutEffect } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { postContentImages } from "fireConfig/images";
import { writingActions } from "reducers/writing";
import { useAppDispatch, useAppSelector } from "store";

const WriteMarkdownEditor = () => {
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        initialEditType: "markdown",
        initialValue: tempWriting?.content,
        height: "100%",
        previewStyle: "vertical",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            try {
              const iamgeUrl = await postContentImages(blob as File);
              callback(iamgeUrl);
            } catch (error) {
              callback("");
            }
          },
        },
      });
      editor.on("change", () => {
        const markdownText = editor.getMarkdown();
        dispatch(writingActions.setContent(markdownText));
      });
    }
  }, []);

  return <div id="editor" />;
};

export default WriteMarkdownEditor;
