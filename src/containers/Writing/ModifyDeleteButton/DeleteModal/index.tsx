import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Button from "components/atoms/Button";
import Modal from "components/organisms/Modal";
import { deleteWriting } from "fireConfig/writings";

import * as S from "./index.style";

export interface Props {
  isOpened: boolean;
  onHide: () => void;
}

const DeleteModal = (props: Props) => {
  const { isOpened, onHide } = props;
  const location = useLocation();
  const history = useHistory();

  const clickDeleteButton = useCallback(async () => {
    try {
      const id = location.pathname.split("/")[2];
      await deleteWriting(id);
      history.replace("/");
    } catch {
      //
    }
  }, [history, location.pathname]);

  return (
    <Modal isOpened={isOpened} size="small_wide">
      <S.Wrapper>
        <p>
          게시글을 삭제하겠습니까?
          <br />
          게시글을 삭제 할 경우 메인 페이지로 이동합니다
        </p>
        <div>
          <Button text="취소" onClick={onHide} color="main_away" />
          <Button text="확인" onClick={clickDeleteButton} />
        </div>
      </S.Wrapper>
    </Modal>
  );
};

export default DeleteModal;
