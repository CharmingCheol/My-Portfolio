import React from "react";
import { useWriteSelector } from "pages/Write/index.reducer";

import * as S from "./index.style";
import BackButton from "./back-button";
import UpdateButton from "./udpate-button";
import CreateButton from "./create-button";

const WriteFooter = () => {
  const writingId = useWriteSelector((state) => state.writing.id);

  return (
    <S.Footer>
      <BackButton />
      {writingId ? <UpdateButton /> : <CreateButton />}
    </S.Footer>
  );
};

export default WriteFooter;
