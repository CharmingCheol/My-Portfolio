import React from "react";

import Date from "components/atoms/Date";
import { WritingDeleteModal } from "common/modals";
import { useWritingSelector } from "pages/Writing/index.reducer";
import { useAppSelector } from "store";

import WriteLinkButton from "./write-link-button/write-link-button";
import DeleteButton from "./delete-button/delete-button";
import * as S from "./index.style";

const WritingHeader = () => {
  const writing = useWritingSelector((state) => state.writingDetail);
  const isAdmin = useAppSelector((state) => state.option?.isAdmin);

  return (
    <>
      <S.Header>{writing.title}</S.Header>
      <Date date={writing.createdAt} />
      {isAdmin && (
        <S.ButtonWrapper>
          <WriteLinkButton />
          <DeleteButton />
        </S.ButtonWrapper>
      )}
      <WritingDeleteModal />
    </>
  );
};

export default WritingHeader;
