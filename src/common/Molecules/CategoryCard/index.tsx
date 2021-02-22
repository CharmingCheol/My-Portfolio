import React from "react";
import { Link } from "react-router-dom";
import Date from "@common/Atoms/Date";
import * as S from "./style";

export interface CategoryCardProps {
  category: string;
  className?: string;
  date: string;
  id: string;
  title: string;
}

const CategoryCard = ({ category, className, date, id, title }: CategoryCardProps) => {
  return (
    <>
      <S.Layout className={className}>
        <Link to={`/blog/${category}/${id}`}>
          <p>{title}</p>
          <Date dateText={date} />
        </Link>
      </S.Layout>
    </>
  );
};

export default CategoryCard;
