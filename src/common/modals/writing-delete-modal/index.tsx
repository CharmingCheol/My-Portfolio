import React from "react";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";
import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { useWritingSelector } from "pages/Writing/index.reducer";
import { useAppDispatch } from "reducers";
import { globalUIActions } from "reducers/globalUI";

import * as S from "./index.style";

const WritingDeleteModal = () => {
  const writingId = useWritingSelector((state) => state.writingDetail.id);
  const WritingsApiReceive = useWritingsApiReceive();
  const dispatch = useAppDispatch();

  const handleClickCancelButton = () => {
    dispatch(globalUIActions.closeModal());
  };

  const handleClickConfirmButton = async () => {
    const resposne = await WritingsApiSend.delete(writingId);
    WritingsApiReceive.delete(resposne);
  };

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
