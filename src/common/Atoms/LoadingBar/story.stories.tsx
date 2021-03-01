import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import LoadingBar from "./index";

export default {
  title: "atoms/LoadingBar",
  component: LoadingBar,
} as Meta;

const Template = () => <LoadingBar />;

// 기본 LoadingBar
export const DefaultLoadingBar = Template.bind({});
