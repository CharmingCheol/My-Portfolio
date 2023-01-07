import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Date from "./index";

export const DefaultTemplate: ComponentStory<typeof Date> = () => <Date date="2022-07-23T06:17:54.779Z" />;

export default {
  title: "atoms/Date",
  component: Date,
} as ComponentMeta<typeof Date>;
