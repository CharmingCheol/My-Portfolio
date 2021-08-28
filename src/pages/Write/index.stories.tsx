import React from "react";
import { Meta } from "@storybook/react";
import Write from "./index";

export default {
  title: "pages/Write",
  component: Write,
} as Meta;

const WritePageTemplate = () => {
  return <Write />;
};
export const WritePage = WritePageTemplate.bind({});
