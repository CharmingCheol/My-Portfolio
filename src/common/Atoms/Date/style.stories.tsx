import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { number, text } from "@storybook/addon-knobs";
import Date, { DateProps } from "./index";

export default {
  title: "atoms/Date",
  component: Date,
  args: {
    dateText: "2021-02-02T15:16:06.300+00:00",
    fontSize: "medium",
    fontWeight: false,
  },
} as Meta;

const Template: Story<DateProps> = (args) => {
  const fontColor = text("fontColor", "black");
  const fontSize = number("fontSize", 1);
  return <Date {...args} fontColor={fontColor} fontSize={fontSize} />;
};

// 기본 Date
export const DefaultDate = Template.bind({});

// Bold가 적용 된 Date
export const BoldDate = Template.bind({});
BoldDate.args = {
  bold: true,
};
