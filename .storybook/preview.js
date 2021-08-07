import React from "react";
import StyleReset from "../src/styles/reset";
import { createGlobalStyle } from "styled-components";

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
