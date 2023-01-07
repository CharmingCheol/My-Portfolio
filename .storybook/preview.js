import React from "react";
import { addDecorator } from "@storybook/react";
import { initializeWorker, mswDecorator } from "msw-storybook-addon";
import { createGlobalStyle } from "styled-components";
import StyleReset from "../src/styles/reset";

initializeWorker();
addDecorator(mswDecorator);

const StorybookReset = createGlobalStyle`
  #root {
    margin:-1rem;
  }
`;

export const decorators = [
  (Story) => (
    <>
      <StyleReset />
      <StorybookReset />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "white",
    values: [
      { name: "white", value: "#ffffff" },
      { name: "black", value: "#000000" },
    ],
  },
};
