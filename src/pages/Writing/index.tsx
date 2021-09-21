import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useAppDispatch, useAppSelector } from "store";
import { changeThumbnail } from "reducers/writeSlice";
import { getWriting } from "apis";
import useApiRequest from "hooks/useApiRequest";
import NotFound from "pages/NotFound";
import { DeleteModal } from "containers/Writing";
import Button from "components/atoms/Button";
import Date from "components/atoms/Date";
import { Writing } from "types/writing";
import * as S from "./index.style";

const WritingPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAdmin = useAppSelector((state) => state.option.isAdmin);
  const [getWritingResponse, getWritingDispatch] = useApiRequest<Writing>(getWriting);
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);

  // 수정 버튼 클릭
  const clickModifyButton = useCallback(() => {
    if (writing) dispatch(changeThumbnail(writing.thumbnail));
  }, [dispatch, writing]);

  // 삭제 버튼 클릭
  const toggleDeleteModal = useCallback(() => {
    setOpenedModal((prev) => !prev);
  }, []);

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
              <Button text="삭제" onClick={toggleDeleteModal} />
            </div>
          )}
          <img src={writing.thumbnail} alt="thumbnail" className="thumbnail" />
          <p>{writing.content}</p>
        </>
      )}
      <div id="viewer" />
      {openedModal && <DeleteModal isOpened={openedModal} onHide={toggleDeleteModal} />}
    </S.Layout>
  );
};

export default WritingPage;
