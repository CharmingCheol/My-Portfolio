import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";
import { rest } from "msw";

import { createWritingFixture } from "fixtures/writing";
import { GlobalContext, rootReducer } from "reducers";
import globalUISlice, { initialState as globalUIState } from "reducers/globalUI";
import optionSlice, { initialState as optionState } from "reducers/option";

import WritingPage from "./index";

interface Props {
  reducer: ReturnType<typeof rootReducer>;
  children: React.ReactChild;
}

const API_PATH = "http://localhost:3001/api/writings/1234";

const MockGlobalStore = ({ reducer, children }: DeepPartial<Props>) => (
  <Provider
    context={GlobalContext}
    store={configureStore({
      reducer: {
        globalUI: createSlice({
          name: globalUISlice.name,
          reducers: globalUISlice.caseReducers as any,
          initialState: reducer?.globalUI || globalUIState,
        }).reducer,
        option: createSlice({
          name: optionSlice.name,
          reducers: optionSlice.caseReducers as any,
          initialState: reducer?.option || optionState,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const Template = ({ reducer }: DeepPartial<Props>) => (
  <MemoryRouter initialEntries={["/writing/1234"]}>
    <MockGlobalStore reducer={reducer}>
      <Route path="/writing/:id" component={WritingPage} />
    </MockGlobalStore>
  </MemoryRouter>
);

export const SuccessTemplate: ComponentStory<typeof WritingPage> = () => <Template />;
SuccessTemplate.parameters = {
  msw: [
    rest.get(API_PATH, (req, res, ctx) =>
      res(ctx.status(OK), ctx.json(createWritingFixture({ id: "1234", content: "content", title: "title" }))),
    ),
  ],
};

export const AdminTemplate: ComponentStory<typeof WritingPage> = () => (
  <Template reducer={{ option: { isAdmin: true } }} />
);
AdminTemplate.parameters = {
  msw: [
    rest.get(API_PATH, (req, res, ctx) =>
      res(ctx.status(OK), ctx.json(createWritingFixture({ id: "1234", content: "content", title: "title" }))),
    ),
  ],
};

export const NotFoundTemplate: ComponentStory<typeof WritingPage> = () => <Template />;
NotFoundTemplate.parameters = {
  msw: [rest.get(API_PATH, (req, res, ctx) => res(ctx.status(NOT_FOUND)))],
};

export const NetworkErrorTemplate: ComponentStory<typeof WritingPage> = () => <Template />;
NetworkErrorTemplate.parameters = {
  msw: [rest.get(API_PATH, (req, res, ctx) => res(ctx.status(INTERNAL_SERVER_ERROR)))],
};

export default {
  title: "pages/Writing",
  component: WritingPage,
} as ComponentMeta<typeof WritingPage>;
