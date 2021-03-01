import React, { memo, useCallback, useContext } from "react";
import Textarea from "@common/Atoms/Textarea";
import { WritePostContext } from "@reducers/WritePost";
import { changeTitle as changeTitleAction } from "@reducers/WritePost/action";
import * as S from "./style";

const TitleInput = () => {
  const { dispatch, initialTitle } = useContext(WritePostContext);

  // 제목 변경
  const changeTitle = useCallback(
    (text: string) => {
      dispatch(changeTitleAction(text));
    },
    [dispatch],
  );

  return (
    <>
      <S.Article>
        <Textarea onChange={changeTitle} placeholder="제목을 입력하세요" textProps={initialTitle} />
      </S.Article>
    </>
  );
};

export default memo(TitleInput);
