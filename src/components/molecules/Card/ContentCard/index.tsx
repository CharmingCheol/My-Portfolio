import React from "react";
import { Link } from "react-router-dom";
import Date from "components/atoms/Date";
import { Content } from "types/content";
import * as S from "./index.style";

export type Props = Pick<Content, "body" | "createdAt" | "id" | "title">;

const ContentCard = (props: Props) => {
  const { body, createdAt, id, title } = props;

  return (
    <S.ContentCard>
      <Link to={`/blog/${id}`}>
        <div>
          <h4>{title}</h4>
          <p>{body}</p>
          <Date date={createdAt} endPoint="T" replaceText={{ from: "-", to: "." }} />
        </div>
      </Link>
    </S.ContentCard>
  );
};

export default ContentCard;
