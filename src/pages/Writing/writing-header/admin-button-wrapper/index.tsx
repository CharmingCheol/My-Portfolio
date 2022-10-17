import React from "react";

import * as S from "./index.style";
import DeleteButton from "./delete-button";
import WriteLinkButton from "./write-link-button";

const AdminButtonWrapper = () => {
  return (
    <S.ButtonWrapper>
      <WriteLinkButton />
      <DeleteButton />
    </S.ButtonWrapper>
  );
};

export default AdminButtonWrapper;
