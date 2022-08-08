import React from "react";
import { Link } from "react-router-dom";

import Date from "components/atoms/Date";
import Button from "components/atoms/Button";
import { WritingDeleteModal } from "common/modals";
import { useAppDispatch, useAppSelector } from "store";
import { globalUIActions } from "reducers/globalUI";
import { writingActions } from "reducers/writing";
import { Writing } from "types/writing";

import * as S from "./index.style";

export interface Props {
  writing: Writing;
}

const WritingHeader = (props: Props) => {
  const { writing } = props;
  const isAdmin = useAppSelector((state) => state.option.isAdmin);

  const dispatch = useAppDispatch();

  const handleClickEditButton = () => {
    dispatch(writingActions.initWriting(writing));
  };

  const handleClickDeleteButton = () => {
    dispatch(globalUIActions.openModal("WritingDeleteModal"));
  };

  return (
    <>
      <S.Header>{writing.title}</S.Header>
      <Date date={writing.createdAt} />
      {isAdmin && (
        <S.ButtonWrapper>
          <Button>
            <Link to={{ pathname: `${process.env.WRITE_PAGE}` }} onClick={handleClickEditButton}>
              수정
            </Link>
          </Button>
          <Button onClick={handleClickDeleteButton}>삭제</Button>
        </S.ButtonWrapper>
      )}
      <WritingDeleteModal />
    </>
  );
};

export default WritingHeader;
