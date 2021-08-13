import React from "react";
import { Meta, Story } from "@storybook/react";
import Date, { Props } from "./index";

export default {
  title: "atoms/Date",
  component: Date,
} as Meta;

const DefaultDateTemplate: Story<Props> = (props) => {
  return <Date {...props} />;
};
export const DefaultDate = DefaultDateTemplate.bind({});
DefaultDate.args = {
  date: "2021-08-02T10:55:51.603Z",
  endPoint: "T",
  replaceText: { from: "-", to: "." },
};
