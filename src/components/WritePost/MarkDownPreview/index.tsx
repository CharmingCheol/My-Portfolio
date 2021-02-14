import React, { useContext } from "react";
import MarkDownRendering from "@common/Organisms/MarkDownRendering";
import { MarkDownEditorContext } from "@reducers/MarkDownEditor";

const MarkDownPreview = () => {
  const { body } = useContext(MarkDownEditorContext);

  return (
    <>
      <MarkDownRendering editorText={body} />
    </>
  );
};

export default MarkDownPreview;
