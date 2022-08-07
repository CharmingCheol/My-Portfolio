import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import NotFound from "pages/NotFound";
import { getWriting } from "fireConfig/writings";
import { Writing } from "types/writing";

import WritingHelmet from "./writing-helmet";
import WritingHeader from "./writing-header";
import WritingViewer from "./writing-viewer";
import * as S from "./index.style";

const WritingPage = () => {
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    const getWritingResponse = async () => {
      try {
        const id = location.pathname.split("/")[2];
        const response = await getWriting(id);
        setWriting(response);
      } catch {
        setIsNotFound(true);
      }
    };
    getWritingResponse();
  }, [location.pathname]);

  if (isNotFound) return <NotFound />;

  return (
    <S.Layout>
      {writing && (
        <>
          <WritingHelmet writing={writing} />
          <WritingHeader writing={writing} />
          <WritingViewer writing={writing} />
        </>
      )}
    </S.Layout>
  );
};

export default WritingPage;
