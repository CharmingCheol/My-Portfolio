import React, { useCallback, useState } from "react";

import { Writing } from "types/writing";
import Button from "components/atoms/Button";
import DeleteModal from "./DeleteModal";
import * as S from "./index.style";

const ModifyDeleteButton = (props: Partial<Writing>) => {
  const { content, title, id } = props;
  const [openedModal, setOpenedModal] = useState(false);

  // 삭제 버튼 클릭
  const toggleDeleteModal = useCallback(() => {
    setOpenedModal((prev) => !prev);
  }, []);

  return (
    <>
      <S.Wrapper>
        <Button text="수정" to={`${process.env.REACT_APP_WRITE_PAGE}`} linkState={{ title, content, id }} />
        <Button text="삭제" onClick={toggleDeleteModal} />
      </S.Wrapper>
      {openedModal && <DeleteModal isOpened={openedModal} onHide={toggleDeleteModal} />}
    </>
  );
};

export default ModifyDeleteButton;
