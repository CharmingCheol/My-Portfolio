import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "components/atoms/Button";
import { openModal } from "reducers/globalUI";
import { Writing } from "types/writing";

import DeleteModal from "./DeleteModal";

import * as S from "./index.style";

const ModifyDeleteButton = (props: Partial<Writing>) => {
  const { content, title, id } = props;
  const dispatch = useDispatch();

  // 삭제 버튼 클릭
  const handleDeleteButtonClick = useCallback(() => {
    dispatch(openModal("delete writing"));
  }, [dispatch]);

  return (
    <>
      <S.Wrapper>
        <Button>
          <Link to={{ pathname: `${process.env.REACT_APP_WRITE_PAGE}`, state: { title, content, id } }}>수정</Link>
        </Button>
        <Button onClick={handleDeleteButtonClick}>삭제</Button>
      </S.Wrapper>
      <DeleteModal modalKey="delete writing" />
    </>
  );
};

export default ModifyDeleteButton;
