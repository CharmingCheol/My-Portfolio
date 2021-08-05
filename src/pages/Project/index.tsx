import React from "react";
import { Helmet } from "react-helmet";
import MuseumWall from "containers/Project/MuseumWall";
import PhotoFrameList from "containers/Project/PhotoFrameList";
import logo from "static/img/logo.png";
import * as S from "./style";

const Project = () => {
  return (
    <>
      <Helmet>
        <meta name="title" content="Charming Proejct" />
        <meta name="description" content="차민철의 프로젝트" />
        <meta name="og:title" content="Charming Proejct" />
        <meta name="og:description" content="차민철의 프로젝트" />
        <meta name="og:image" content={logo} />
      </Helmet>
      <S.Layout>
        <MuseumWall />
        <PhotoFrameList />
      </S.Layout>
    </>
  );
};

export default Project;
