/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Input from "@common/Atoms/Input";
import HashTag from "@common/Atoms/HashTag";
import useInput from "@hooks/useInput";
import { WritePostContext } from "@reducers/WritePost";
import { addHashTag, removeHashTag } from "@reducers/WritePost/action";
import * as S from "./style";

const HashTagInput = () => {
  const { dispatch, initialHashTag } = useContext(WritePostContext);
  const [hashTagText, changeHashTagText, setHashTagText] = useInput("");
  const [hashTagList, setHashTagList] = useState<string[]>([]);

  // 엔터 입력
  const pressEnterKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const trim = hashTagText.replace(/(^\s*)|(\s*$)/gi, "");
        if (!trim) return;
        setHashTagList((prev) => [...prev, trim]);
        setHashTagText("");
        dispatch(addHashTag(trim));
      }
    },
    [dispatch, hashTagText, setHashTagText],
  );

  // 해시태그 클릭
  const clickTag = useCallback(
    (clicked: string) => {
      const tagIndex = hashTagList.findIndex((value) => value === clicked);
      setHashTagList((prev) => [...prev.slice(0, tagIndex), ...prev.slice(tagIndex + 1, hashTagList.length)]);
      dispatch(removeHashTag(tagIndex));
    },
    [dispatch, hashTagList],
  );

  // 수정 게시글 데이터 적용
  useEffect(() => {
    if (!initialHashTag) return;
    setHashTagList(initialHashTag);
  }, [initialHashTag]);

  return (
    <>
      <S.Layout>
        {hashTagList.map((hashTag) => (
          <div key={hashTag} onClick={() => clickTag(hashTag)}>
            <HashTag text={hashTag} />
          </div>
        ))}
        <Input
          value={hashTagText}
          onChange={changeHashTagText}
          onKeyDown={pressEnterKey}
          placeholder="태그를 입력하세요"
        />
      </S.Layout>
    </>
  );
};

export default HashTagInput;
