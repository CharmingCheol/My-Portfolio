import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import { WritingsApiReceive } from "apis/receive";
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
  const writingDetailId = useWritingSelector((state) => state.writingDetail.id);
  const writingDispatch = useWritingDispatch();
  const apiReceive = WritingsApiReceive();

  useLayoutEffect(() => {
    if (!stringValidator.isNotEmptyString(id)) {
      writingDispatch(writingActions.setIsNotFound(true));
      return;
    }
    (async () => {
      const response = await WritingsApiSend.findOne(id);
      apiReceive.findOne(response);
    })();
  }, []);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <S.Layout>
      {writingDetailId && (
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
