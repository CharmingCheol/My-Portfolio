import React, { useContext } from "react";

import VinylRecordPlayer from "@components/Profile/VinylRecordPlayer";
import IntroducePart from "@components/Profile/IntroducePart";
import VinylRecordsMenu from "@components/Profile/VinylRecordsMenu";
import { ProfileContext } from "./reducer";
import * as S from "./style";

const Profile = () => {
  const { backgroundColor } = useContext(ProfileContext);

  return (
    <>
      <S.Layout background={backgroundColor}>
        <VinylRecordPlayer />
        <IntroducePart />
        <VinylRecordsMenu />
      </S.Layout>
    </>
  );
};

export default Profile;
