import React from "react";

import Date from "components/atoms/Date";
import { WritingDeleteModal } from "common/modals";
import { useWritingSelector } from "pages/Writing/index.reducer";
import { useAppSelector } from "reducers";

import * as S from "./index.style";
import AdminButtonWrapper from "./admin-button-wrapper";

const WritingHeader = () => {
  const writing = useWritingSelector((state) => state.writingDetail);
  const isAdmin = useAppSelector((state) => state.option.isAdmin);

  return (
    <>
      <S.Header>{writing.title}</S.Header>
      <Date date={writing.createdAt} />
      {isAdmin && <AdminButtonWrapper />}
      <WritingDeleteModal />
    </>
  );
};

export default WritingHeader;
