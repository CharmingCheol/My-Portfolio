import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MainLayout } from "common";

import NotFound from "./index";

const Template = () => (
  <MemoryRouter>
    <MainLayout>
      <NotFound />
    </MainLayout>
  </MemoryRouter>
);

export const BaseTemplate: ComponentStory<typeof NotFound> = () => <Template />;

export default {
  title: "pages/NotFound",
  component: NotFound,
} as ComponentMeta<typeof NotFound>;
