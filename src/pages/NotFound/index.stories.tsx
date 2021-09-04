import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import Header from "components/organisms/Header";
import { MainLayout } from "common";
import NotFound from "./index";

export default {
  title: "pages/NotFound",
  component: NotFound,
} as Meta;

const NotFoundPageTemplate = () => {
  return (
    <MemoryRouter>
      <Header />
      <MainLayout>
        <NotFound />
      </MainLayout>
    </MemoryRouter>
  );
};
export const NotFoundPage = NotFoundPageTemplate.bind({});
