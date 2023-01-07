import React, { useEffect, useState } from "react";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";
import Button from "components/atoms/Button";
import { createWritingBody } from "fixtures/writing";
import { useWriteSelector } from "pages/Write/index.reducer";
import { stringValidator } from "services";
import { WritingRequestBody } from "types/writing";

const CreateButton = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const writing = useWriteSelector((state) => state.writing);
  const WritingsApiReceive = useWritingsApiReceive();

  const isNotEmptyWritingBody = (writingBody: WritingRequestBody): boolean => {
    return Object.values(writingBody).every((value) => stringValidator.isNotEmptyString(value));
  };

  const handleClickCreateButton = async () => {
    const writingBody = createWritingBody(writing);
    if (isNotEmptyWritingBody(writingBody)) {
      const response = await WritingsApiSend.create(writingBody);
      WritingsApiReceive.create(response);
    }
  };

  useEffect(() => {
    const writingBody = createWritingBody(writing);
    const nextState = isNotEmptyWritingBody(writingBody);
    setDisabledButton(!nextState);
  }, [writing]);

  return (
    <Button disabled={disabledButton} onClick={handleClickCreateButton}>
      출간하기
    </Button>
  );
};

export default CreateButton;
