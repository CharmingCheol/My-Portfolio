import React from "react";
import { render, screen } from "@testing-library/react";
import Date, { Props } from "./index";

const year = "2021";
const month = "09";
const day = "28";
const endPoint = "T";
const replaceText = { from: "-", to: "." };
const yearMonthDay = `${year}${replaceText.from}${month}${replaceText.from}${day}`; // 2021-09-28

const initialProps: Props = {
  date: `${yearMonthDay}${endPoint}10:55:51.603Z`,
  endPoint,
  replaceText,
};

describe("atoms/Date", () => {
  const setup = (props: Partial<Props> = {}) => {
    return render(<Date {...initialProps} {...props} />);
  };

  it("date props를 주었을 때, YYYY.MM.DD으로 변환한다", () => {
    setup();
    const result = `${year}${replaceText.to}${month}${replaceText.to}${day}`;
    expect(screen.getByText(result)).toBeInTheDocument(); // 2021.09.28
  });

  it("endPoint를 찾지 못한 경우, 빈 문자열로 리턴한다", () => {
    const wrongEndPoint = "A";
    setup({ endPoint: wrongEndPoint });
    expect(screen.getByText("", { ignore: "body, div" })).toBeInTheDocument();
  });

  it("변환 할 text를 찾지 못한 경우 변환하지 않는다", () => {
    const wrongText = "/";
    const result = `${year}${replaceText.from}${month}${replaceText.from}${day}`;
    setup({ replaceText: { from: wrongText, to: "." } });
    expect(screen.getByText(result)).toBeInTheDocument(); // 2021-09-28. replaceValue로 변환하지 않음
  });
});
