import React, { useCallback, useState } from "react";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";
import ContentCard from "components/molecules/Card/ContentCard";
import Pagination from "components/molecules/Pagination";
import { useBlogSelector } from "pages/Blog/index.reducer";

import * as S from "./index.style";

const WritingList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const writingPagination = useBlogSelector((state) => state.writingPagination);
  const WritingsApiReceive = useWritingsApiReceive();

  const handleClickPageButton = useCallback(async (page: number) => {
    const response = await WritingsApiSend.pagination(page);
    WritingsApiReceive.nextPagination(response);
    setCurrentPage(page);
  }, []);

  return (
    <>
      <S.WritingList data-cy="writing-list">
        {writingPagination.list.map((writing) => (
          <ContentCard key={writing.id} {...writing} />
        ))}
      </S.WritingList>
      <Pagination
        now={currentPage}
        totalCount={writingPagination.totalCount}
        size={10}
        onClick={handleClickPageButton}
      />
    </>
  );
};

export default WritingList;
