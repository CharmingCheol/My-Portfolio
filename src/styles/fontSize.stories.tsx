import React from "react";
import { Meta } from "@storybook/react";
import fontSize from "./fontSize";

const DefaultFontSizeTemplate = () => {
  return (
    <>
      <h1>h1(40px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <h2>h2(26px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
      <h3>h3(22px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h3>
      <h4>h4(20px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h4>
      <h5>h5(20px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h5>
      <h6>h6(20px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h6>
      <p>p(16px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      <span>span(16px) : Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
    </>
  );
};
export const DefaultFontSize = DefaultFontSizeTemplate.bind({});

const SubFontSizeTemplate = () => {
  return (
    <>
      <p>default(16px) : Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, cum?</p>
      <p style={{ fontSize: fontSize.sub }}>
        sub(14px) : Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, cum?
      </p>
    </>
  );
};
export const SubFontSize = SubFontSizeTemplate.bind({});

export default {
  title: "style/fontSize",
} as Meta;
