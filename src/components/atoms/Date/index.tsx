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
   * 연/도/일의 divider가 되는 문자열
   */
  searchValue: string;

  /**
   * searchValue가 변경 결과
   */
  replaceValue: string;
}

const Date = (props: Props) => {
  const { className = [], date, endPoint, replaceValue, searchValue } = props;

  const getDate = () => {
    const index = date.indexOf(endPoint);
    if (index === -1) return "";
    const substring = date.substring(0, index);
    const regExp = new RegExp(searchValue, "gi");
    const replaceAll = substring.replace(regExp, replaceValue);
    return replaceAll;
  };

  return <span className={classnames(...className)}>{getDate()}</span>;
};

export default Date;
