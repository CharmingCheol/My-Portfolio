import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";

import { getWriting } from "apis";
import { useAppSelector } from "store";
import useApiRequest from "hooks/useApiRequest";

import NotFound from "pages/NotFound";
import { ModifyDeleteButton } from "containers/Writing";
import Date from "components/atoms/Date";

import { Writing } from "types/writing";
import * as S from "./index.style";

const WritingPage = () => {
  const location = useLocation();
  const isAdmin = useAppSelector((state) => state.option.isAdmin);
  const [getWritingResponse, getWritingDispatch] = useApiRequest<Writing>(getWriting);
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  // 마크다운 viewer 적용
  useEffect(() => {
    switch (getWritingResponse.type) {
      case "SUCCESS": {
        if (getWritingResponse.responseData) {
          const editor = new Viewer({
            el: document.querySelector("#viewer") as HTMLDivElement,
            initialValue: getWritingResponse.responseData.content,
          });
          setWriting(getWritingResponse.responseData);
        }
        break;
      }
      case "FAILURE": {
        setIsNotFound(true);
        break;
      }
      default: {
        if (getWritingResponse.type === "REQUEST") return;
        const spliting = location.pathname.split("/");
        const id = spliting[spliting.length - 1];
        getWritingDispatch({
          type: "REQUEST",
          url: id,
        });
        break;
      }
    }
  }, [getWritingDispatch, getWritingResponse.responseData, getWritingResponse.type, location.pathname]);

  if (isNotFound) return <NotFound />;

  return (
    <S.Layout>
      {writing && (
        <>
          <h1>{writing.title}</h1>
          <Date date={writing.createdAt} endPoint="T" replaceText={{ from: "-", to: "." }} />
          {isAdmin && <ModifyDeleteButton content={writing.content} title={writing.title} id={writing.id} />}
          <p>{writing.content}</p>
        </>
      )}
      <div id="viewer" />
    </S.Layout>
  );
};

export default WritingPage;
