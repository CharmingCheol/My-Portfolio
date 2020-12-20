/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React, { useContext, useCallback, useEffect, useRef, useState } from "react";
import { ProfileContext } from "@pages/Profile/reducer";
import * as S from "./style";

interface KeywordListProps {
  visibled: boolean;
}

const KeywordList = ({ visibled }: KeywordListProps) => {
  const [delayedVinylRecord, setDelayedVinylRecord] = useState<{ title: string; list: string[] }>({
    title: "",
    list: [],
  });
  const [renewTextRatio, setRenewTextRatio] = useState(1);
  const { backgroundColor, keywordList, textRatio } = useContext(ProfileContext);
  const timeoutId = useRef(0);
  const prevTitle = useRef("");
  const textListRef = useRef<HTMLDivElement>(null);
  const progressBarGaugeRef = useRef<HTMLDivElement>(null);

  // 프로그래스 바 게이지 갱신
  const setGuagePosition = useCallback(() => {
    if (!progressBarGaugeRef.current) return;
    const context = textListRef.current as HTMLDivElement;
    const currentTopPos = context.scrollTop;
    const listHeight = context.scrollHeight - context.clientHeight;
    progressBarGaugeRef.current.style.width = `${(currentTopPos / listHeight) * 100}%`;
  }, []);

  // reducer한테 전달 받은 리스트를 바로 갱신하지 않고, 1.1초 뒤에 갱신
  useEffect(() => {
    if (!keywordList) return;
    setDelayedVinylRecord({ title: "", list: [] });
    timeoutId.current = setTimeout(() => {
      prevTitle.current = keywordList.title;
      setDelayedVinylRecord(keywordList);
      if (!progressBarGaugeRef.current) return;
      progressBarGaugeRef.current.style.width = "0%";
    }, 1100);
    return () => clearTimeout(timeoutId.current);
  }, [keywordList]);

  // textListRef scroll event
  useEffect(() => {
    textListRef.current?.addEventListener("scroll", setGuagePosition);
  }, [setGuagePosition]);

  // textListRef resize event
  useEffect(() => {
    textListRef.current?.addEventListener("resize", setGuagePosition);
  }, [setGuagePosition]);

  // 텍스트 비율 적용
  useEffect(() => {
    if (textRatio >= 0 && textRatio <= 20) {
      setRenewTextRatio(1);
    } else if (textRatio >= 21 && textRatio <= 40) {
      setRenewTextRatio(1.25);
    } else if (textRatio >= 41 && textRatio <= 60) {
      setRenewTextRatio(1.5);
    } else if (textRatio >= 61 && textRatio <= 80) {
      setRenewTextRatio(1.75);
    } else if (textRatio >= 81 && textRatio <= 100) {
      setRenewTextRatio(2);
    }
  }, [textRatio]);

  return (
    <>
      <S.TextHidRect position="top" visibled={visibled} background={backgroundColor}>
        <S.TitleWrapper displayed={delayedVinylRecord.title}>
          <h1>{delayedVinylRecord.title || prevTitle.current}</h1>
          <h2>스크롤을 올리거나 내려주세요.</h2>
          <div className="progress-bar">
            <div ref={progressBarGaugeRef} className="progress-bar-gauge" />
          </div>
        </S.TitleWrapper>
      </S.TextHidRect>
      <S.TextListWrapper ref={textListRef} visibled={visibled} textRatio={renewTextRatio}>
        {delayedVinylRecord.list.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </S.TextListWrapper>
      <S.TextHidRect position="bottom" visibled={visibled} background={backgroundColor} />
    </>
  );
};

export default KeywordList;
