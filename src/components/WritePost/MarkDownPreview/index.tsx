import React, { useContext } from "react";
import MarkDownRendering from "@common/Organisms/MarkDownRendering";
import { WritePostContext } from "@reducers/WritePost";
import * as S from "./style";

const MarkDownPreview = () => {
  const { body, title } = useContext(WritePostContext);

  return (
    <>
      <S.Layout>
        <S.Title>{title}</S.Title>
        <MarkDownRendering editorText={body} />
      </S.Layout>
    </>
  );
};

export default MarkDownPreview;
