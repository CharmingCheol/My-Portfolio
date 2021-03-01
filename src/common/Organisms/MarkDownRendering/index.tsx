import React from "react";
import remark from "remark";
import breaks from "remark-breaks";
import gfm from "remark-gfm";
import htmlPlugin from "remark-html";
import reactParser from "html-react-parser";
import prismPlugin from "@utils/modules/prism-plugin";
import * as S from "./style";

interface MarkDownRenderingProps {
  editorText: string;
}

const MarkDownRendering = ({ editorText }: MarkDownRenderingProps) => {
  const htmlText = remark().use(prismPlugin).use(breaks).use(gfm).use(htmlPlugin).processSync(editorText);

  return (
    <>
      <S.MarkdownWrapper className="atom-one-dark">{reactParser(htmlText.contents as string)}</S.MarkdownWrapper>
    </>
  );
};

export default MarkDownRendering;
