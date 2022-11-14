import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Date from "./index";

export const DefaultTemplate: ComponentStory<typeof Date> = () => <Date date="2022-07-10 16:37:52.492500" />;

export default {
  title: "atoms/Date",
  component: Date,
} as ComponentMeta<typeof Date>;
