import React from "react";
import { useHistory } from "react-router-dom";

import Button from "components/atoms/Button";
import { writingActions } from "reducers/writing";
import { useAppDispatch } from "store";

const BackButton = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleClickGoBackButton = () => {
    dispatch(writingActions.clearWriting());
    history.goBack();
  };

  return (
    <Button onClick={handleClickGoBackButton} color="main_away">
      뒤로가기
    </Button>
  );
};

export default BackButton;
