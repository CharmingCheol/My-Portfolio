import React from "react";
import classnames from "classnames";

export interface Props {
  className?: string[];

  /**
   * 날짜가 담긴 문자열.
   * 단, 문자열의 첫 글자는 연도로 시작해야 됨(ex. 2021.01.01T10:55:51.603Z)
   */
  date: string;

  /**
   * 연/월/일 다음에 있는 글자.
   * 2021.01.01T10:55:51.603Z인 경우 T가 endpoint에 해당
   */
  endPoint: string;

  /**
   * 변환 할 문자열 찾고, 어떤 문자열로 변환할지 체크
   */
  replaceText: { from: string; to: string };
}

const Date = (props: Props) => {
  const { className = [], date, endPoint, replaceText } = props;

  const getDate = () => {
    const index = date.indexOf(endPoint);
    if (index === -1) return "";
    const substring = date.substring(0, index);
    const regExp = new RegExp(replaceText.from, "gi");
    const replaceAll = substring.replace(regExp, replaceText.to);
    return replaceAll;
  };

  return <span className={classnames(...className)}>{getDate()}</span>;
};

export default Date;
