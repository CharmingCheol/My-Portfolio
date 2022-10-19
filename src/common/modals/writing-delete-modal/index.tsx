import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { useAppDispatch } from "reducers";
import { globalUIActions } from "reducers/globalUI";
import { deleteWriting } from "fireConfig/writings";

import * as S from "./index.style";

const WritingDeleteModal = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleClickCancelButton = useCallback(() => {
    dispatch(globalUIActions.closeModal());
  }, [dispatch]);

  const handleClickConfirmButton = useCallback(async () => {
    try {
      const id = location.pathname.split("/")[2];
      await deleteWriting(id);
      history.replace("/");
      handleClickCancelButton();
    } catch {
      handleClickCancelButton();
    }
  }, [history, location.pathname, handleClickCancelButton]);

  return (
    <Modal modalKey="WritingDeleteModal">
      <S.ModalWrapper>
        <Modal.Header>게시글 삭제</Modal.Header>
        <Modal.Body>
          <p>
            게시글을 삭제하겠습니까?
            <br />
            게시글을 삭제 할 경우 메인 페이지로 이동합니다
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClickCancelButton} color="main_away" className="cancel">
            취소
          </Button>
          <Button onClick={handleClickConfirmButton}>확인</Button>
        </Modal.Footer>
      </S.ModalWrapper>
    </Modal>
  );
};

export default WritingDeleteModal;
