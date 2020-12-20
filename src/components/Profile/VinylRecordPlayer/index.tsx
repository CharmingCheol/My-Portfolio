import React from "react";

import VinylRecord from "@static/svg/vinylRecord";
import ScoialMedia from "@components/Profile/SocialMedia";
import BottomButtons from "@components/Profile/BottomButtons";
import * as S from "./style";

const VinylRecordPlayer = () => {
  return (
    <>
      <S.Layout>
        <ScoialMedia />
        <S.RecordPlayerWrapper>
          <S.VinyRecordWrapper>
            <VinylRecord />
          </S.VinyRecordWrapper>
        </S.RecordPlayerWrapper>
        <BottomButtons />
      </S.Layout>
    </>
  );
};

export default VinylRecordPlayer;
