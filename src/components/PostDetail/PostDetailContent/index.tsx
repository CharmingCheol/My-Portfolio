import React from "react";
import MarkDownRendering from "@common/Organisms/MarkDownRendering";
import * as S from "./style";

export interface PostDetailContentProps {
  body: string;
}

const PostDetailContent = ({ body }: PostDetailContentProps) => {
  return (
    <>
      <S.Layout>
        <MarkDownRendering editorText={body} />
      </S.Layout>
    </>
  );
};

export default PostDetailContent;
