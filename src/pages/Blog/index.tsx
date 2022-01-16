import React, { useCallback, useLayoutEffect, useState } from "react";

import { getWritingList } from "fireConfig/writings";
import { WritingPagination } from "types/writing";

import ContentCard from "components/molecules/Card/ContentCard";
import Pagination from "components/molecules/Pagination";

import * as S from "./index.style";

const Blog = () => {
  const [writingPagination, setWritingPagination] = useState<WritingPagination | null>(null);
  const [paginationNumber, setPaginationNumber] = useState(1);

  const clickPaginationItem = useCallback(async (now: number) => {
    try {
      const response = await getWritingList({ now, size: 10 });
      setWritingPagination(response);
      setPaginationNumber(now);
    } catch {
      setWritingPagination(null);
    }
  }, []);

  // 최초 게시글 리스트 api
  useLayoutEffect(() => {
    const callGetWritingList = async () => {
      try {
        const response = await getWritingList({ now: 1, size: 10 });
        setWritingPagination(response);
      } catch {
        setWritingPagination(null);
      }
    };
    callGetWritingList();
  }, []);

  return (
    <div>
      {writingPagination && (
        <>
          <S.CardList className="card-list">
            {writingPagination.list.map(({ title, content, createdAt, id }) => (
              <ContentCard key={id} title={title} createdAt={createdAt} content={content} id={id} />
            ))}
          </S.CardList>
          <Pagination
            now={paginationNumber}
            totalCount={writingPagination.totalCount}
            size={10}
            onClick={clickPaginationItem}
          />
        </>
      )}
    </div>
  );
};

export default Blog;
