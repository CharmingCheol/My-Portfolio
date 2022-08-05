import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";

import optionSlice, { OptionState } from "reducers/option";
import globalUISlice, { GlobalUIState } from "reducers/globalUI";
import WritingHeader, { Props } from "./index";
import { Layout as PageLayout } from "../index.style";

interface State {
  option: OptionState;
  globalUI: GlobalUIState;
}

const MockStore = ({ state, children }: { state: State; children: React.ReactChild }) => (
  <Provider
    store={configureStore({
      reducer: {
        option: createSlice({
          name: optionSlice.name,
          reducers: {},
          initialState: state.option,
        }).reducer,
        globalUI: createSlice({
          name: globalUISlice.name,
          reducers: {},
          initialState: state.globalUI,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const Template: Story<Props> = (props) => (
  <MemoryRouter>
    <PageLayout>
      <WritingHeader {...props} />
    </PageLayout>
  </MemoryRouter>
);

export const BaseTemplate = Template.bind({});
BaseTemplate.args = {
  writing: {
    content: "content",
    createdAt: new Date().toString(),
    id: "id",
    title: "title",
  },
};

export const AdminTemplate = Template.bind({});
AdminTemplate.decorators = [
  (story) => <MockStore state={{ option: { isAdmin: true }, globalUI: { modalKey: "" } }}>{story()}</MockStore>,
];
AdminTemplate.args = {
  writing: {
    content: "content",
    createdAt: new Date().toString(),
    id: "id",
    title: "title",
  },
};

export default {
  title: "pages/Writing/writing-header",
  component: WritingHeader,
} as Meta;
