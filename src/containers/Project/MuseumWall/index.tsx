import React, { memo } from "react";
import * as S from "./style";

const MuseumWall = () => {
  return (
    <>
      <S.Layout>
        <section className="wall wall-left" />
        <section className="wall shadow wall-left-shadow" />
        <section className="wall wall-right" />
        <section className="wall shadow wall-right-shadow" />
      </S.Layout>
    </>
  );
};

export default memo(MuseumWall);
