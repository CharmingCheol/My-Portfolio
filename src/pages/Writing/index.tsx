import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import { getWriting } from "apis";
import useApiRequest from "hooks/useApiRequest";
import NotFound from "pages/NotFound";
import Date from "components/atoms/Date";
import { Writing } from "types/writing";
import * as S from "./index.style";

const WritingPage = () => {
  const location = useLocation();
  const [getWritingApi, apiDispatch] = useApiRequest<Writing>(getWriting);
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    switch (getWritingApi.type) {
      case "SUCCESS": {
        if (getWritingApi.responseData) {
          const editor = new Viewer({
            el: document.querySelector("#viewer") as HTMLDivElement,
            initialValue: getWritingApi.responseData.body,
          });
          setWriting(getWritingApi.responseData);
        }
        break;
      }
      case "FAILURE": {
        setIsNotFound(true);
        break;
      }
      default: {
        if (getWritingApi.type === "REQUEST") return;
        const spliting = location.pathname.split("/");
        const id = spliting[spliting.length - 1];
        apiDispatch({
          type: "REQUEST",
          requestData: { params: { id } },
        });
        break;
      }
    }
  }, [apiDispatch, getWritingApi.responseData, getWritingApi.type, location.pathname]);

  if (isNotFound) return <NotFound />;

  return (
    <S.Main>
      {writing && (
        <>
          <h1>{writing.title}</h1>
          <Date date={writing.createdAt} endPoint="T" replaceText={{ from: "-", to: "." }} />
          <img src={writing.thumbnail} alt="thumbnail" className="thumbnail" />
          <p>{writing.body}</p>
        </>
      )}
      <div id="viewer" />
    </S.Main>
  );
};

export default WritingPage;
