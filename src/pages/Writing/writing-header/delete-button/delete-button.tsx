import React from "react";

import Button from "components/atoms/Button";
import { globalUIActions } from "reducers/globalUI";
import { useAppDispatch } from "store";

const DeleteButton = () => {
  const dispatch = useAppDispatch();

  const handleClickDeleteButton = () => {
    dispatch(globalUIActions.openModal("WritingDeleteModal"));
  };

  return <Button onClick={handleClickDeleteButton}>삭제</Button>;
};

export default DeleteButton;
