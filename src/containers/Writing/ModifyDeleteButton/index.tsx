import React, { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [openedModal, setOpenedModal] = useState(false);

  const id = useMemo(() => {
    const spliting = location.pathname.split("/");
    return spliting[spliting.length - 1];
  }, [location.pathname]);

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
          linkState={{ title, content, thumbnail, id }}
          onClick={clickModifyButton}
        />
        <Button text="삭제" onClick={toggleDeleteModal} />
      </S.Wrapper>
      {openedModal && <DeleteModal isOpened={openedModal} onHide={toggleDeleteModal} />}
    </>
  );
};

export default ModifyDeleteButton;
