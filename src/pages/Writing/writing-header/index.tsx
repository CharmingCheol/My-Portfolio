import React from "react";

import Date from "components/atoms/Date";
import { WritingDeleteModal } from "common/modals";
import { useAppSelector } from "store";
import { Writing } from "types/writing";

import WriteLinkButton from "./write-link-button/write-link-button";
import DeleteButton from "./delete-button/delete-button";
import * as S from "./index.style";

export interface Props {
  writing: Writing;
}

const WritingHeader = (props: Props) => {
  const { writing } = props;
  const isAdmin = useAppSelector((state) => state.option.isAdmin);

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
