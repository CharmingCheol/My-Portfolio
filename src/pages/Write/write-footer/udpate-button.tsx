import React, { useEffect, useState } from "react";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";
import Button from "components/atoms/Button";
import { createWritingBody } from "fixtures/writing";
import { useWriteSelector } from "pages/Write/index.reducer";
import { stringValidator } from "services";
import { WritingRequestBody } from "types/writing";

const UpdateButton = () => {
  const [disabledButton, setDisabledButton] = useState(true);
  const writing = useWriteSelector((state) => state.writing);
  const WritingsApiReceive = useWritingsApiReceive();

  const isNotEmptyWritingBody = (writingBody: WritingRequestBody): boolean => {
    return Object.values(writingBody).every((value) => stringValidator.isNotEmptyString(value));
  };

  const handleClickUpdateButton = async () => {
    const writingBody = createWritingBody(writing);
    if (isNotEmptyWritingBody(writingBody)) {
      const response = await WritingsApiSend.update({ body: writingBody, id: writing.id });
      WritingsApiReceive.update(response);
    }
  };

  useEffect(() => {
    const writingBody = createWritingBody(writing);
    const nextState = isNotEmptyWritingBody(writingBody);
    setDisabledButton(!nextState);
  }, [writing]);

  return (
    <Button disabled={disabledButton} onClick={handleClickUpdateButton}>
      수정하기
    </Button>
  );
};

export default UpdateButton;
