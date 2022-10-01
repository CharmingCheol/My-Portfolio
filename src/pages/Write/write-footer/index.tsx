import React from "react";
import { useAppSelector } from "store";

import * as S from "./index.style";
import BackButton from "./back-button/back-button";
import UpdateButton from "./udpate-button/udpate-button";
import CreateButton from "./create-button/create-button";

const WriteFooter = () => {
  const tempWriting = useAppSelector((state) => state.writing.tempWriting);

  return (
    <S.Footer>
      <BackButton />
      {tempWriting.id ? <UpdateButton /> : <CreateButton />}
    </S.Footer>
  );
};

export default WriteFooter;
