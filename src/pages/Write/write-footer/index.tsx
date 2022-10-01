import React from "react";
import { useAppSelector } from "store";

import * as S from "./index.style";
import BackButton from "./back-button/back-button";
import UpdateButton from "./udpate-button/udpate-button";
import CreateButton from "./create-button/create-button";

const WriteFooter = () => {
  const writingId = useAppSelector((state) => state.writing.tempWriting.id);

  return (
    <S.Footer>
      <BackButton />
      {writingId ? <UpdateButton /> : <CreateButton />}
    </S.Footer>
  );
};

export default WriteFooter;
