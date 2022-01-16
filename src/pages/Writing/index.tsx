import React, { useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";

import { getWriting } from "fireConfig/writings";
import { useAppSelector } from "store";

import NotFound from "pages/NotFound";
import { ModifyDeleteButton } from "containers/Writing";
import Date from "components/atoms/Date";

import { Writing } from "types/writing";
import * as S from "./index.style";

const WritingPage = () => {
  const location = useLocation();
  const isAdmin = useAppSelector((state) => state.option.isAdmin);
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const shortenContent = useMemo(() => {
    const removedMd = removeMd(
      writing?.content.replace(/```([\s\S]*?)```/g, "").replace(/~~~([\s\S]*?)~~~/g, "") || "",
    );
    return removedMd;
  }, [writing?.content]);

  // 마크다운 viewer 적용
  useLayoutEffect(() => {
    const callGetWriting = async () => {
      try {
        const id = location.pathname.split("/")[2];
        const response = await getWriting(id);
        const editor = new Viewer({
          el: document.querySelector("#viewer") as HTMLDivElement,
          initialValue: response.content,
        });
        setWriting(response);
      } catch {
        setIsNotFound(true);
      }
    };
    callGetWriting();
  }, [location.pathname]);

  if (isNotFound) return <NotFound />;

  return (
    <S.Layout>
      {writing && (
        <>
          <Helmet>
            <title>{writing.title}</title>
            <meta name="description" content={shortenContent} />
          </Helmet>
          <h1>{writing.title}</h1>
          <Date date={writing.createdAt} />
          {isAdmin && <ModifyDeleteButton content={writing.content} title={writing.title} id={writing.id} />}
        </>
      )}
      <div id="viewer" />
    </S.Layout>
  );
};

export default WritingPage;
