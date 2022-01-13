import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import removeMd from "remove-markdown";

import Date from "components/atoms/Date";
import { Writing } from "types/writing";
import * as S from "./index.style";

export type Props = Pick<Writing, "content" | "createdAt" | "id" | "title">;

const ContentCard = (props: Props) => {
  const { content, createdAt, id, title } = props;

  const shortenContent = useMemo(() => {
    console.log("removeMd(content)", content, removeMd(content));
    const removedMd = removeMd(content.replace(/```([\s\S]*?)```/g, "").replace(/~~~([\s\S]*?)~~~/g, ""));
    return removedMd;
  }, [content]);

  return (
    <S.ContentCard>
      <Link to={`/writing/${id}`}>
        <div>
          <h4>{title}</h4>
          <p>{shortenContent}</p>
          <Date date={createdAt} />
        </div>
      </Link>
    </S.ContentCard>
  );
};

export default ContentCard;
