import React, { useMemo, useState } from "react";
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
    total,
    visibleCount = 5,
    onClick,
    ...other
  } = props;
  const [disabledPrevButton, setDisabledPrevButton] = useState(true);
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const range = useMemo(() => {
    const nowStartPage = Math.floor((now - 1) / visibleCount) * visibleCount + 1;
    let nowEndPage: number;
    if (total < nowStartPage + visibleCount) {
      nowEndPage = nowStartPage + (total - nowStartPage);
    } else if (total === nowStartPage + visibleCount) {
      nowEndPage = nowStartPage + (total - nowStartPage) - 1;
    } else {
      nowEndPage = nowStartPage + visibleCount - 1;
    }
    const length = nowEndPage - nowStartPage + 1;
    setDisabledPrevButton(now <= 1);
    setDisabledNextButton(total <= now);
    return Array.from({ length }, (_, index) => nowStartPage + index);
  }, [now, total, visibleCount]);

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
    const floor = Math.floor(now / visibleCount);
    switch (item) {
      case "first":
        return onClick(1);
      case "previous": {
        const quotient = Math.floor((now - visibleCount) / visibleCount);
        const previous = quotient * visibleCount + 1;
        return onClick(floor === 0 ? 1 : previous);
      }
      case "next": {
        const quotient = Math.floor((now - 1) / visibleCount);
        const next = quotient * visibleCount + visibleCount + 1;
        return onClick(total <= next ? total : next);
      }
      case "last":
        return onClick(total);
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
