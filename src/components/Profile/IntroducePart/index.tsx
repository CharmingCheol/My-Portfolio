import React, { useContext, useMemo } from "react";
import { ProfileContext } from "@pages/Profile/reducer";
import KeywordList from "@components/Profile/KeywordList";
import MyResume from "@components/Profile/MyResume";
import * as S from "./style";

const IntroducePart = () => {
  const { selectedVinylRecord } = useContext(ProfileContext);
  const visibled = useMemo(() => selectedVinylRecord === "resume", [selectedVinylRecord]);

  return (
    <>
      <S.Layout>
        <KeywordList visibled={!visibled} />
        <MyResume visibled={visibled} />
      </S.Layout>
    </>
  );
};

export default IntroducePart;
