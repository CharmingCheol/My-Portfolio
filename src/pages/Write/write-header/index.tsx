import React from "react";

import { useWriteDispatch, useWriteSelector, writeActions } from "pages/Write/index.reducer";

import * as S from "./index.style";

const WriteHeader = () => {
  const title = useWriteSelector((state) => state.writing.title);
  const writeDispatch = useWriteDispatch();

  const handleChangeTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    writeDispatch(writeActions.changeTitle(value));
  };

  return (
    <S.Wrapper>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        maxLength={100}
        onChange={handleChangeTitleInput}
        value={title}
      />
    </S.Wrapper>
  );
};

export default WriteHeader;
