import React, { useCallback, useState } from "react";

import ContentCard from "components/molecules/Card/ContentCard";
import Pagination from "components/molecules/Pagination";
import { getWritingList } from "fireConfig/writings";
import { writingActions } from "reducers/writing";
import { useAppDispatch, useAppSelector } from "store";

import * as S from "./index.style";

const WritingList = () => {
  const writingPagination = useAppSelector((state) => state.writing.writingPagination);
  const [paginationNumber, setPaginationNumber] = useState(1);

  const dispatch = useAppDispatch();

  const handleClickPaginationItem = useCallback(
    async (now: number) => {
      try {
        const response = await getWritingList({ now, size: 10 });
        dispatch(writingActions.updateWritingList(response.list));
        setPaginationNumber(now);
      } catch {
        dispatch(writingActions.updateWritingList([]));
      }
    },
    [dispatch],
  );

  return (
    <>
      <S.WritingList>
        {writingPagination.list.map((writing) => (
          <ContentCard key={writing.id} {...writing} />
        ))}
      </S.WritingList>
      <Pagination
        now={paginationNumber}
        totalCount={writingPagination.totalCount}
        size={10}
        onClick={handleClickPaginationItem}
      />
    </>
  );
};

export default WritingList;
