import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import * as S from "./style";

export interface PageNumberListProps {
  onClick: (page: number) => void;
  postCount: number;
}

const PAGE_RANGE = 5;

const PageNumberList = ({ onClick, postCount }: PageNumberListProps) => {
  const lastPageNumber = useRef(0);
  const [numberList, setNumberList] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [printNextBtn, setPrintNextBtn] = useState(false);

  // 페이지 번호 클릭
  const clickPageNumber = useCallback(
    (page: number) => {
      try {
        if (currentNumber === page) return;
        onClick(page);
        setCurrentNumber(page);
      } catch {
        setCurrentNumber((prev) => prev);
      }
    },
    [currentNumber, onClick],
  );

  // [이전], [다음] 버튼 클릭
  const clickArrowBtn = useCallback(
    (arrow: "prev" | "next") => {
      try {
        const nextNumber = arrow === "prev" ? numberList[0] - PAGE_RANGE : numberList[0] + PAGE_RANGE;
        const nextPageRange = lastPageNumber.current - nextNumber + 1;
        const nextPageList = Array(nextPageRange > PAGE_RANGE ? PAGE_RANGE : nextPageRange)
          .fill(0)
          .map((_, index) => nextNumber + index);
        onClick(nextNumber);
        setNumberList(nextPageList);
        setPrintNextBtn(nextPageRange > PAGE_RANGE);
        setCurrentNumber(nextPageList[0]);
      } catch {
        setNumberList((prev) => prev);
        setPrintNextBtn((prev) => prev);
        setCurrentNumber((prev) => prev);
      }
    },
    [numberList, onClick],
  );

  // numberList 최초 설정
  useLayoutEffect(() => {
    if (!postCount) return;
    lastPageNumber.current = Math.floor(postCount / 12) + (postCount % 12 ? 1 : 0);
    setNumberList(() => {
      if (lastPageNumber.current <= PAGE_RANGE) {
        const partialNumberList = Array(lastPageNumber.current)
          .fill(0)
          .map((_, index) => index + 1);
        return partialNumberList;
      }
      return [1, 2, 3, 4, 5];
    });
    setPrintNextBtn(lastPageNumber.current > PAGE_RANGE);
  }, [postCount]);

  return (
    <>
      <S.Layout>
        {numberList.length ? (
          <>
            {numberList[0] !== 1 && <BsChevronLeft onClick={() => clickArrowBtn("prev")} />}
            <S.PageNumberList>
              {numberList.map((number) => (
                <S.PageNumberItem
                  key={number}
                  onClick={() => clickPageNumber(number)}
                  className={currentNumber === number ? "active" : ""}
                >
                  {number}
                </S.PageNumberItem>
              ))}
            </S.PageNumberList>
            {printNextBtn && <BsChevronRight onClick={() => clickArrowBtn("next")} />}
          </>
        ) : (
          ""
        )}
      </S.Layout>
    </>
  );
};

export default PageNumberList;
