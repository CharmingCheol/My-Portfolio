import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalContext } from "reducers";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentStory } from "@storybook/react";
import { NOT_FOUND, OK } from "http-status";
import { rest } from "msw";

import { createWritingFixtureList } from "fixtures/writing";
import { WritingPagination } from "types/writing";

import BlogPage from "./index";

const API_PATH = "http://localhost:3001/api/writings?page=1";

const MockGlobalStore: React.FunctionComponent = ({ children }) => (
  <Provider context={GlobalContext} store={configureStore({ reducer: {} })}>
    {children}
  </Provider>
);

const Template = () => (
  <MemoryRouter>
    <MockGlobalStore>
      <BlogPage />
    </MockGlobalStore>
  </MemoryRouter>
);

export const SuccessTemplate: ComponentStory<typeof BlogPage> = () => <Template />;
SuccessTemplate.parameters = {
  msw: [
    rest.get(API_PATH, (req, res, ctx) =>
      res(
        ctx.status(OK),
        ctx.json<WritingPagination>({
          list: createWritingFixtureList(10, {
            content: "content",
            title: "title",
            id: "id",
            createdAt: "2022-07-10T16:37:52.492500",
          }),
          totalCount: 28,
        }),
      ),
    ),
  ],
};

export const ErrorTemplate: ComponentStory<typeof BlogPage> = () => <Template />;
ErrorTemplate.parameters = {
  msw: [rest.get(API_PATH, (req, res, ctx) => res(ctx.status(NOT_FOUND)))],
};

export default {
  title: "pages/Blog",
  component: BlogPage,
};
