import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { boolean } from "@storybook/addon-knobs";
import Button, { ButtonProps } from "./index";

export default {
  title: "atoms/Button",
  component: Button,
  args: {
    type: "text",
  },
} as Meta;

// 기본 Button
const Template: Story<ButtonProps> = (args) => {
  const disabled = boolean("disabled", false);
  return (
    <Button {...args} disabled={disabled}>
      버튼
    </Button>
  );
};
export const DefaultButton = Template.bind({});

// 비활성화 Button
const DisabledTemplate: Story<ButtonProps> = (args) => {
  const disabled = boolean("disabled", true);
  return (
    <Button {...args} disabled={disabled}>
      버튼
    </Button>
  );
};
export const DisabledButton = DisabledTemplate.bind({});
