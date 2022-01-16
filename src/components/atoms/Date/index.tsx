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
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
      default:
        return "-1";
    }
  }, []);

  const formattedDate = useMemo(() => {
    const [month, day, year] = date.split(" ").slice(1, 4);
    const monthToNumber = convertMMMtoNumber(month);
    return `${year}.${monthToNumber}.${day}`;
  }, [convertMMMtoNumber, date]);

  return <span className={classnames(...className)}>{formattedDate}</span>;
};

export default Date;
