import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { boolean, number, text } from "@storybook/addon-knobs";
import Input, { InputProps } from "./index";

export default {
  title: "atoms/Input",
  component: Input,
  args: {
    type: "text",
  },
} as Meta;

// 기본 Input
const Template: Story<InputProps> = (args) => {
  const disabled = boolean("disabled", false);
  const maxLength = number("maxLength", 10);
  const placeholder = text("placeholder", "입력하세요");
  return <Input {...args} disabled={disabled} maxLength={maxLength} placeholder={placeholder} />;
};
export const DefaultInput = Template.bind({});

// 비활성화 Input
const DisabledTemplate: Story<InputProps> = (args) => {
  const disabled = boolean("disabled", true);
  const maxLength = number("maxLength", 10);
  const placeholder = text("placeholder", "입력하세요");
  return <Input {...args} disabled={disabled} maxLength={maxLength} placeholder={placeholder} />;
};
export const DisabledInput = DisabledTemplate.bind({});
