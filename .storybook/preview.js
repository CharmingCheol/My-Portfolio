import React from "react";
import StyleReset from "../src/styles/reset";

export const decorators = [
  (Story) => (
    <>
      <StyleReset />
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
