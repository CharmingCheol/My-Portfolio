import React from "react";
import { render, screen } from "@testing-library/react";
import Date, { Props } from "./index";

const year = "2021";
const month = "09";
const day = "28";
const endPoint = "T";
const searchValue = "-";
const replaceValue = ".";
const yearMonthDay = `${year}${searchValue}${month}${searchValue}${day}`; // 2021-09-28

const initialProps: Props = {
  date: `${yearMonthDay}${endPoint}10:55:51.603Z`,
  endPoint,
  searchValue,
  replaceValue,
};

describe("atoms/Date", () => {
  const setup = (props: Partial<Props> = {}) => {
    return render(<Date {...initialProps} {...props} />);
  };

  it("date props를 주었을 때, YYYY.MM.DD으로 변환한다", () => {
    setup();
    const result = `${year}${replaceValue}${month}${replaceValue}${day}`;
    expect(screen.getByText(result)).toBeInTheDocument(); // 2021.09.28
  });

  it("endPoint를 찾지 못한 경우, 빈 문자열로 리턴한다", () => {
    const wrongEndPoint = "A";
    setup({ endPoint: wrongEndPoint });
    expect(screen.getByText("", { ignore: "body, div" })).toBeInTheDocument();
  });

  it("searchValue를 찾지 못한 경우, replaceValue로 변환하지 않는다", () => {
    const wrongSearchValue = "/";
    const result = `${year}${searchValue}${month}${searchValue}${day}`;
    setup({ searchValue: wrongSearchValue });
    expect(screen.getByText(result)).toBeInTheDocument(); // 2021-09-28. replaceValue로 변환하지 않음
  });
});
