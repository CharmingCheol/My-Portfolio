import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Date from "components/atoms/Date";
import Button from "components/atoms/Button";
import { WritingDeleteModal } from "common/modals";
import { useAppSelector } from "store";
import { openModal } from "reducers/globalUI";
import { Writing } from "types/writing";

import * as S from "./index.style";

export interface Props {
  writing: Writing;
}

const WritingHeader = (props: Props) => {
  const { writing } = props;
  const linkState = { title: writing.title, content: writing.content, id: writing.id };
  const isAdmin = useAppSelector((state) => state.option.isAdmin);

  const dispatch = useDispatch();

  const handleClickDeleteButton = () => {
    dispatch(openModal("WritingDeleteModal"));
  };

  return (
    <>
      <S.Header>{writing.title}</S.Header>
      <Date date={writing.createdAt} />
      {isAdmin && (
        <S.ButtonWrapper>
          <Button>
            <Link to={{ pathname: `${process.env.WRITE_PAGE}`, state: linkState }}>수정</Link>
          </Button>
          <Button onClick={handleClickDeleteButton}>삭제</Button>
        </S.ButtonWrapper>
      )}
      <WritingDeleteModal />
    </>
  );
};

export default WritingHeader;
