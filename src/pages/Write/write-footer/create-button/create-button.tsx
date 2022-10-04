import React, { useEffect, useState } from "react";

import { createWritingApi } from "api/writings";
import Button from "components/atoms/Button";
import { stringValidator } from "services";
import { useAppSelector } from "store";

const CreateButton = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);

  const handleClickCreateButton = async () => {
    if (createWritingApi.validate(tempWriting)) {
      const response = await createWritingApi.dispatch(tempWriting);
      createWritingApi.receive(response);
    }
  };

  useEffect(() => {
    const validateTarget = [tempWriting.content, tempWriting.title];
    const hasAllValue = validateTarget.every((value) => stringValidator.hasValue(value));
    setDisabledButton(!hasAllValue);
  }, [tempWriting]);

  return (
    <Button disabled={disabledButton} onClick={handleClickCreateButton}>
      출간하기
    </Button>
  );
};

export default CreateButton;
