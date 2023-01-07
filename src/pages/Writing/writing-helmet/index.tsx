import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";

import { useWritingSelector } from "pages/Writing/index.reducer";

const WritingHelmet = () => {
  const writing = useWritingSelector((state) => state.writingDetail);

  const descriptionMeta = useMemo(
    () => removeMd(writing.content.replace(/```([\s\S]*?)```/g, "").replace(/~~~([\s\S]*?)~~~/g, "") || ""),
    [writing.content],
  );

  return (
    <Helmet>
      <title>{writing.title}</title>
      <meta name="description" content={descriptionMeta} />
    </Helmet>
  );
};

export default WritingHelmet;
