import React, { useEffect, useState } from "react";

import { updateWritingApi } from "api/writings";
import Button from "components/atoms/Button";
import { stringValidator } from "services";
import { useAppSelector } from "store";

const UpdateButton = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);

  const handleClickUpdateButton = async () => {
    if (updateWritingApi.validate({ body: tempWriting, id: tempWriting.id })) {
      const response = await updateWritingApi.dispatch({ body: tempWriting, id: tempWriting.id });
      updateWritingApi.receive(response);
    }
  };

  useEffect(() => {
    const validateTarget = [tempWriting.content, tempWriting.title];
    const hasAllValue = validateTarget.every((value) => stringValidator.hasValue(value));
    setDisabledButton(!hasAllValue);
  }, [tempWriting]);

  return (
    <Button disabled={disabledButton} onClick={handleClickUpdateButton}>
      수정하기
    </Button>
  );
};

export default UpdateButton;
