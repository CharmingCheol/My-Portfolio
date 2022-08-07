import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import removeMd from "remove-markdown";

import { Writing } from "types/writing";

interface Props {
  writing: Writing;
}

const WritingHelmet = (props: Props) => {
  const { writing } = props;

  const descriptionMeta = useMemo(() => {
    const removedMd = removeMd(
      writing?.content.replace(/```([\s\S]*?)```/g, "").replace(/~~~([\s\S]*?)~~~/g, "") || "",
    );
    return removedMd;
  }, [writing?.content]);

  return (
    <Helmet>
      <title>{writing.title}</title>
      <meta name="description" content={descriptionMeta} />
    </Helmet>
  );
};

export default WritingHelmet;
