import React, { useContext } from "react";
import MuseumWall from "@components/Project/MuseumWall";
import PhotoFrameList from "@components/Project/PhotoFrameList";
import CubePopup from "@components/Project/CubePopup";
import { projectContext } from "./reducer";
import * as S from "./style";

const Project = () => {
  const { togglePopup } = useContext(projectContext);

  return (
    <>
      <S.Layout>
        <MuseumWall />
        <PhotoFrameList />
        {togglePopup && <CubePopup />}
      </S.Layout>
    </>
  );
};

export default Project;
