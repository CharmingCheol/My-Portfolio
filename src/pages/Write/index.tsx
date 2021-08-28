import React, { useCallback, useState, useLayoutEffect } from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { postContentImages } from "apis";
import SettingModal from "containers/Write/SettingModal";
import Button from "components/atoms/Button";

const Write = () => {
  const [showedModal, setShowedModal] = useState(false);

  // 환경설정 버튼 클릭
  const handleModalToggle = useCallback(() => {
    setShowedModal((prev) => !prev);
  }, []);

  // toast ui editor 적용
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
              const { data } = await postContentImages({ data: formData });
              const urlSplitting = data.url.split("/");
              const splitedLength = urlSplitting.length - 1;
              callback(data.url, urlSplitting[splitedLength]);
            } catch (error) {
              console.error(error);
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
        <Button text="환경설정" onClick={handleModalToggle} />
      </footer>
      <SettingModal onHide={handleModalToggle} showedModal={showedModal} />
    </main>
  );
};

export default Write;
