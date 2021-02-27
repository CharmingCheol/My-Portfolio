import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import VinylRecordPlayer from "@components/Profile/VinylRecordPlayer";
import IntroducePart from "@components/Profile/IntroducePart";
import VinylRecordsMenu from "@components/Profile/VinylRecordsMenu";
import logo from "@static/img/logo.png";
import { ProfileContext } from "./reducer";
import * as S from "./style";

const Profile = () => {
  const { backgroundColor } = useContext(ProfileContext);

  return (
    <>
      <Helmet>
        <meta name="title" content="Charming Profile" />
        <meta name="description" content="차민철의 프로필" />
        <meta name="og:title" content="Charming Profile" />
        <meta name="og:description" content="차민철의 프로필" />
        <meta name="og:image" content={logo} />
      </Helmet>
      <S.Layout background={backgroundColor}>
        <VinylRecordPlayer />
        <IntroducePart />
        <VinylRecordsMenu />
      </S.Layout>
    </>
  );
};

export default Profile;
