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
  date: "Wed Jan 12 2022 23:50:58 GM",
};
