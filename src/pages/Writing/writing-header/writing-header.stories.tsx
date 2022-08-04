import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";

import { OptionState } from "reducers/option";
import WritingHeader, { Props } from "./writing-header";
import { Layout as PageLayout } from "../index.style";

const MockStore = ({ state, children }: { state: OptionState; children: React.ReactChild }) => (
  <Provider
    store={configureStore({
      reducer: {
        option: createSlice<OptionState, SliceCaseReducers<OptionState>>({
          name: "option",
          reducers: {},
          initialState: state,
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
AdminTemplate.decorators = [(story) => <MockStore state={{ isAdmin: true }}>{story()}</MockStore>];
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
