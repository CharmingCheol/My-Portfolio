import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "components/atoms/Button";
import { patchWriting, postWriting } from "fireConfig/writings";
import { writingActions } from "reducers/writing";
import { useAppDispatch, useAppSelector } from "store";

import * as S from "./index.style";

const WriteFooter = () => {
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleClickGoBackButton = () => {
    dispatch(writingActions.clearWriting());
    history.goBack();
  };

  const handleClickSubmitButton = useCallback(async () => {
    if (!tempWriting.title?.trim() || !tempWriting.content?.trim()) {
      return;
    }
    const writingId = tempWriting.id
      ? await patchWriting(tempWriting.id, { content: tempWriting.content, title: tempWriting.title })
      : await postWriting({ content: tempWriting.content, title: tempWriting.title });
    history.replace(`/writing/${writingId}`);
  }, [history, tempWriting]);

  useEffect(() => {
    setDisabledSubmitButton(() => {
      if (!tempWriting.title || !tempWriting.content) {
        return true;
      }
      return !tempWriting.title.trim() || !tempWriting.content.trim();
    });
  }, [tempWriting]);

  return (
    <S.Footer>
      <Button onClick={handleClickGoBackButton} color="main_away">
        뒤로가기
      </Button>
      <Button disabled={disabledSubmitButton} onClick={handleClickSubmitButton}>
        출간하기
      </Button>
    </S.Footer>
  );
};

export default WriteFooter;
