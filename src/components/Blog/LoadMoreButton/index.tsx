import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "@common/Atoms/Button";
import * as S from "./style";

export interface LoadMoreButtonProps {
  postCount: number | null;
  onClick: ({ page }: { page: number }) => void;
}

const LoadMoreButton = ({ postCount, onClick }: LoadMoreButtonProps) => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(0);
  const pageNumberRef = useRef(2);

  // 불러오기 버튼 클릭
  const clickLoadMoreBtn = useCallback(() => {
    try {
      setDisabledBtn(true);
      onClick({ page: pageNumberRef.current });
      pageNumberRef.current += 1;
      setDisabledBtn(false);
    } catch {
      setDisabledBtn(true);
      setPrintBtn(0);
    }
  }, [onClick]);

  // 게시글 수 갱신
  useEffect(() => {
    if (!postCount) return;
    setPrintBtn(postCount);
  }, [postCount]);

  return (
    <>
      {printBtn === 12 && (
        <S.Layout>
          <Button disabled={disabledBtn} onClick={clickLoadMoreBtn}>
            불러오기
          </Button>
        </S.Layout>
      )}
    </>
  );
};

export default LoadMoreButton;
