import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import HashTag, { HashTagProps } from "./index";

export default {
  title: "atoms/HashTag",
  component: HashTag,
  args: {
    text: "차민철",
  },
} as Meta;

const Template: Story<HashTagProps> = (args) => <HashTag {...args} />;

// 기본 HashTag
export const DefaultHashTag = Template.bind({});
