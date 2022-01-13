import React, { useCallback, useMemo } from "react";
import classnames from "classnames";

export interface Props {
  className?: string[];

  /**
   * 날짜가 담긴 문자열.
   * @example Wed Jan 12 2022 23:50:58 GM
   */
  date: string;
}

const Date = (props: Props) => {
  const { className = [], date } = props;

  // 월 format을 숫자로 변경
  const convertMMMtoNumber = useCallback((mmm: string) => {
    switch (mmm) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;
      default:
        return -1;
    }
  }, []);

  const joinDate = useCallback((year: string, month: number, day: string) => {
    return `${year}.${month}.${day}`;
  }, []);

  const formattedDate = useMemo(() => {
    const [month, day, year] = date.split(" ").slice(1, 4);
    const monthToNumber = convertMMMtoNumber(month);
    return joinDate(year, monthToNumber, day);
  }, [convertMMMtoNumber, date, joinDate]);

  return <span className={classnames(...className)}>{formattedDate}</span>;
};

export default Date;
