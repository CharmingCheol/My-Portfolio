import React from "react";

import { writingActions } from "reducers/writing";
import { useAppDispatch, useAppSelector } from "store";

import * as S from "./index.style";

const WriteHeader = () => {
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);
  const dispatch = useAppDispatch();

  const handleChangeTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(writingActions.setTitle(value));
  };

  return (
    <S.Wrapper>
      <input
        type="text"
        className="title-input"
        placeholder="제목을 입력하세요"
        maxLength={100}
        onChange={handleChangeTitleInput}
        value={tempWriting?.title || ""}
      />
    </S.Wrapper>
  );
};

export default WriteHeader;
