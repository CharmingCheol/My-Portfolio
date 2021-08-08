import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import Pagination from "./index";
import { Props } from "./type";

export default {
  title: "molecules/Pagination",
  component: Pagination,
} as Meta;

// available handle controls
const DefaultPaginationTemplate: Story<Props> = (props) => {
  const { now: nowProps, onClick, ...other } = props;
  const [now, setNow] = useState(1);
  const handleClickItem = (itemNumber: number) => {
    setNow(itemNumber);
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>now : {now}</div>
      <Pagination now={now} onClick={handleClickItem} {...other} />
    </>
  );
};
export const DefaultPagiantion = DefaultPaginationTemplate.bind({});
DefaultPagiantion.args = {
  total: 50,
  visibleCount: 5,
};

// 맨 앞으로, 맨 뒤로 버튼 숨기기
const HideFisrtLastButtonTemplate: Story<Props> = (props) => {
  const { now: nowProps, onClick, ...other } = props;
  const [now, setNow] = useState(1);
  const handleClickItem = (itemNumber: number) => {
    setNow(itemNumber);
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>now : {now}</div>
      <Pagination now={now} onClick={handleClickItem} {...other} />
    </>
  );
};
export const HideFisrtLastButton = HideFisrtLastButtonTemplate.bind({});
HideFisrtLastButton.args = {
  total: 50,
  visibleCount: 5,
  isShowedFirstButton: false,
  isShowedLastButton: false,
};
