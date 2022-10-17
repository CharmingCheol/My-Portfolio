import React from "react";
import { Link } from "react-router-dom";

import Button from "components/atoms/Button";
// import { writingActions } from "reducers/writing";
// import { useAppDispatch } from "store";

const WriteLinkButton = () => {
  // const dispatch = useAppDispatch();

  const handleClickEditButton = () => {
    // dispatch(writingActions.initTempWriting());
  };

  return (
    <Button>
      <Link to={`${process.env.WRITE_PAGE}`} onClick={handleClickEditButton}>
        수정
      </Link>
    </Button>
  );
};

export default WriteLinkButton;
