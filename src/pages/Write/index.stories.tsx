import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import Write from "./index";

export default {
  title: "pages/Write",
  component: Write,
} as Meta;

const WritePageTemplate = () => {
  return (
    <MemoryRouter>
      <Write />
    </MemoryRouter>
  );
};
export const WritePage = WritePageTemplate.bind({});
