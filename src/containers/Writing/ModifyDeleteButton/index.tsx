import React, { useCallback, useState } from "react";

import { useAppDispatch } from "store";
import { changeThumbnail } from "reducers/writeSlice";

import Button from "components/atoms/Button";
import DeleteModal from "./DeleteModal";
import * as S from "./index.style";

interface Props {
  content: string;
  title: string;
  thumbnail: string;
}

const ModifyDeleteButton = (props: Props) => {
  const { content, title, thumbnail } = props;
  const dispatch = useAppDispatch();
  const [openedModal, setOpenedModal] = useState(false);

  // 수정 버튼 클릭
  const clickModifyButton = useCallback(() => {
    dispatch(changeThumbnail(thumbnail));
  }, [dispatch, thumbnail]);

  // 삭제 버튼 클릭
  const toggleDeleteModal = useCallback(() => {
    setOpenedModal((prev) => !prev);
  }, []);

  return (
    <>
      <S.Wrapper>
        <Button
          text="수정"
          to={`${process.env.WRITE_PAGE}`}
          linkState={{ title, content }}
          onClick={clickModifyButton}
        />
        <Button text="삭제" onClick={toggleDeleteModal} />
      </S.Wrapper>
      {openedModal && <DeleteModal isOpened={openedModal} onHide={toggleDeleteModal} />}
    </>
  );
};

export default ModifyDeleteButton;
