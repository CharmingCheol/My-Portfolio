import React, { useMemo } from "react";
import classnames from "classnames";

interface Props {
  className?: string[];

  date: string;
}

const Date = (props: Props) => {
  const { className = [], date } = props;

  const formattedDate = useMemo(() => {
    const [yyyymmdd] = date.split("T");
    return yyyymmdd;
  }, [date]);

  return <span className={classnames(...className)}>{formattedDate}</span>;
};

export default Date;
