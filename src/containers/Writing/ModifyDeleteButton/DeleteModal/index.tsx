import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { closeModal } from "reducers/globalUI";
import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { deleteWriting } from "fireConfig/writings";

import * as S from "./index.style";

interface Props {
  modalKey: string;
}

const DeleteModal = (props: Props) => {
  const { modalKey } = props;

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // 취소 버튼 클릭
  const handleCancelButtonClick = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // 확인 버튼 클릭
  const handleConfirmButtonClick = useCallback(async () => {
    try {
      const id = location.pathname.split("/")[2];
      await deleteWriting(id);
      history.replace("/");
      handleCancelButtonClick();
    } catch {
      handleCancelButtonClick();
    }
  }, [history, location.pathname, handleCancelButtonClick]);

  return (
    <Modal modalKey={modalKey}>
      <Modal.Header>게시글 삭제</Modal.Header>
      <Modal.Body>
        <p>
          게시글을 삭제하겠습니까?
          <br />
          게시글을 삭제 할 경우 메인 페이지로 이동합니다
        </p>
      </Modal.Body>
      <Modal.Footer>
        <S.CancelButton onClick={handleCancelButtonClick} color="main_away">
          취소
        </S.CancelButton>
        <Button onClick={handleConfirmButtonClick}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
