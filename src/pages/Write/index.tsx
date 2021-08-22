import React, { useLayoutEffect } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { postImages } from "apis";
import Button from "components/atoms/Button";

const Write = () => {
  useLayoutEffect(() => {
    const editorSelector = document.querySelector("#editor") as HTMLElement;
    if (editorSelector) {
      const editor = new Editor({
        el: editorSelector,
        height: "100vh",
        initialEditType: "markdown",
        previewStyle: "vertical",
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            try {
              const formData = new FormData();
              formData.append("images", blob, (blob as File).name);
              const result = await postImages({ data: formData });
              const urlSplit = result.data.url.split("/");
              const splitedLength = urlSplit.length - 1;
              callback(result.data.url, urlSplit[splitedLength]);
            } catch (error) {
              //
            }
          },
        },
      });
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
