import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MainLayout } from "common";
import { GlobalContext } from "reducers";

import Login from "./index";

const MockGlobalStore: React.FunctionComponent = ({ children }) => (
  <Provider context={GlobalContext} store={configureStore({ reducer: {} })}>
    {children}
  </Provider>
);

const Template = () => (
  <MockGlobalStore>
    <MemoryRouter>
      <MainLayout>
        <Login />
      </MainLayout>
    </MemoryRouter>
  </MockGlobalStore>
);

export const BaseTemplate: ComponentStory<typeof Login> = () => <Template />;

export default {
  title: "pages/Login",
  component: Login,
} as ComponentMeta<typeof Login>;
