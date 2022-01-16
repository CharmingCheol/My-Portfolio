import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineRight, AiOutlineDoubleRight } from "react-icons/ai";
import classnames from "classnames";

import Button from "components/atoms/Button";
import Icon from "components/atoms/Icon";

import * as S from "./index.style";
import { PaginationIcon, Props } from "./type";

const Pagination = (props: Props) => {
  const {
    className = [],
    isShowedFirstButton = true,
    isShowedLastButton = true,
    now,
    totalCount,
    size,
    visiblePage = 5,
    onClick,
    ...other
  } = props;
  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const totalPage = useMemo(() => {
    const quotient = Math.floor(totalCount / size);
    return totalCount / size === quotient ? quotient : quotient + 1;
  }, [size, totalCount]);

  const range = useMemo(() => {
    const nowStartPage = Math.floor((now - 1) / visiblePage) * visiblePage + 1;
    let nowEndPage: number;
    if (totalPage < nowStartPage + visiblePage) {
      nowEndPage = nowStartPage + (totalPage - nowStartPage);
    } else if (totalPage === nowStartPage + visiblePage) {
      nowEndPage = nowStartPage + (totalPage - nowStartPage) - 1;
    } else {
      nowEndPage = nowStartPage + visiblePage - 1;
    }
    const length = nowEndPage - nowStartPage + 1;
    setDisabledPrevButton(now <= 1);
    setDisabledNextButton(totalPage <= now);
    return Array.from({ length }, (_, index) => nowStartPage + index);
  }, [now, totalPage, visiblePage]);

  const itmes = [
    ...(isShowedFirstButton ? ["first"] : []),
    "previous",
    ...range,
    "next",
    ...(isShowedLastButton ? ["last"] : []),
  ];

  const iconType = (type: PaginationIcon) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "first":
        return AiOutlineDoubleLeft;
      case "previous":
        return AiOutlineLeft;
      case "next":
        return AiOutlineRight;
      case "last":
        return AiOutlineDoubleRight;
    }
  };

  const handleClickItem = (item: number | PaginationIcon) => () => {
    const floor = Math.floor(now / visiblePage);
    switch (item) {
      case "first":
        return onClick(1);
      case "previous": {
        const quotient = Math.floor((now - visiblePage) / visiblePage);
        const previous = quotient * visiblePage + 1;
        return onClick(floor === 0 ? 1 : previous);
      }
      case "next": {
        const quotient = Math.floor((now - 1) / visiblePage);
        const next = quotient * visiblePage + visiblePage + 1;
        return onClick(totalPage <= next ? totalPage : next);
      }
      case "last":
        return onClick(totalPage);
      default:
        return onClick(item);
    }
  };

  return (
    <S.Pagination {...other}>
      <ul>
        {itmes.map((item) => (
          <S.Item key={item} className={classnames(...className)}>
            {typeof item === "number" ? (
              <Button
                text={item.toString()}
                onClick={handleClickItem(item)}
                color={item === now ? "sub2" : "sub2_away"}
              />
            ) : (
              <Icon
                icon={iconType(item as PaginationIcon)}
                onClick={handleClickItem(item as PaginationIcon)}
                disabled={item === "first" || item === "previous" ? disabledPrevButton : disabledNextButton}
              />
            )}
          </S.Item>
        ))}
      </ul>
    </S.Pagination>
  );
};

export default Pagination;
