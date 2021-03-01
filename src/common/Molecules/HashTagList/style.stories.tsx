import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { array } from "@storybook/addon-knobs";
import HashTagList, { HashTagListProps } from "./index";

export default {
  title: "molecules/HashTagList",
  component: HashTagList,
} as Meta;

const Template: Story<HashTagListProps> = (args) => {
  const hashTagList = array("hashTagList", ["해", "시", "태", "그"]);
  return <HashTagList {...args} hashTagList={hashTagList} />;
};

// 기본 HashTagList
export const DefaultHashTagList = Template.bind({});
