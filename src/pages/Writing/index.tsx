import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useAppDispatch, useAppSelector } from "store";
import { changeThumbnail } from "reducers/writeSlice";
import { getWriting } from "apis";
import useApiRequest from "hooks/useApiRequest";
import NotFound from "pages/NotFound";
import Button from "components/atoms/Button";
import Date from "components/atoms/Date";
import { Writing } from "types/writing";
import * as S from "./index.style";

const WritingPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [getWritingApi, apiDispatch] = useApiRequest<Writing>(getWriting);
  const isAdmin = useAppSelector((state) => state.option.isAdmin);
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  // 수정 버튼 클릭
  const clickModifyButton = useCallback(() => {
    if (writing) dispatch(changeThumbnail(writing.thumbnail));
  }, [dispatch, writing]);

  // 마크다운 viewer 적용
  useEffect(() => {
    switch (getWritingApi.type) {
      case "SUCCESS": {
        if (getWritingApi.responseData) {
          const editor = new Viewer({
            el: document.querySelector("#viewer") as HTMLDivElement,
            initialValue: getWritingApi.responseData.content,
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
    <S.Layout>
      {writing && (
        <>
          <h1>{writing.title}</h1>
          <Date date={writing.createdAt} endPoint="T" replaceText={{ from: "-", to: "." }} />
          {isAdmin && (
            <div className="buttons">
              <Button
                text="수정"
                to={`${process.env.WRITE_PAGE}`}
                linkState={{
                  title: writing.title,
                  content: writing.content,
                }}
                onClick={clickModifyButton}
              />
              <Button text="삭제" />
            </div>
          )}
          <img src={writing.thumbnail} alt="thumbnail" className="thumbnail" />
          <p>{writing.content}</p>
        </>
      )}
      <div id="viewer" />
    </S.Layout>
  );
};

export default WritingPage;