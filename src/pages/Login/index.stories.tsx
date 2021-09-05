import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import { Header, MainLayout } from "common";
import Login from "./index";

export default {
  title: "pages/Login",
  component: Login,
} as Meta;

const LoginPageTemplate = () => {
  return (
    <MemoryRouter>
      <Header />
      <MainLayout>
        <Login />
      </MainLayout>
    </MemoryRouter>
  );
};
export const LoginPage = LoginPageTemplate.bind({});
