import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";
import NotFound from "pages/NotFound";
import { stringValidator } from "services";

import WritingProvider, { writingActions, useWritingDispatch, useWritingSelector } from "./index.reducer";
import WritingHelmet from "./writing-helmet";
import WritingHeader from "./writing-header";
import WritingViewer from "./writing-viewer";
import * as S from "./index.style";

const WritingPage = () => {
  const { id } = useParams<{ id: string }>();
  const isNotFound = useWritingSelector((state) => state.isNotFound);
  const writingId = useWritingSelector((state) => state.writingDetail.id);
  const WritingsApiReceive = useWritingsApiReceive();
  const writingDispatch = useWritingDispatch();

  useLayoutEffect(() => {
    if (!stringValidator.isNotEmptyString(id)) {
      writingDispatch(writingActions.setIsNotFound(true));
      return;
    }
    (async () => {
      const response = await WritingsApiSend.findOne(id);
      WritingsApiReceive.findOne(response);
    })();
  }, []);

  if (isNotFound) {
    return <NotFound />;
  }

  console.log("writingId", writingId);

  return (
    <S.Layout>
      {writingId && (
        <>
          <WritingHelmet />
          <WritingHeader />
          <WritingViewer />
        </>
      )}
    </S.Layout>
  );
};

const WritingPageWrapper = () => (
  <WritingProvider>
    <WritingPage />
  </WritingProvider>
);

export default WritingPageWrapper;
