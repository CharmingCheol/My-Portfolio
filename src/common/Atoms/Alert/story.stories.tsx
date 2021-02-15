import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { text } from "@storybook/addon-knobs";
import Alert, { AlertProps } from "./index";

export default {
  title: "atoms Alert",
  component: Alert,
} as Meta;

// 성공 Alert
const SuccessAlertTemplate: Story<AlertProps> = (args) => {
  const Alerttext = text("text", "texttext");
  return <Alert {...args} status="success" text={Alerttext} />;
};
export const SuccessAlert = SuccessAlertTemplate.bind({});

// 에러 Alert
const ErrorAlertTemplate: Story<AlertProps> = (args) => {
  const Alerttext = text("text", "texttext");
  return <Alert {...args} status="error" text={Alerttext} />;
};
export const ErrorAlert = ErrorAlertTemplate.bind({});
