import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ComponentStory } from "@storybook/react";
import { NOT_FOUND, OK } from "http-status";
import { rest } from "msw";

import { createWritingFixtureList } from "fixtures/writing";
import { Writing, WritingPagination } from "types/writing";

import BlogPage from "./index";

const API_PATH = "http://localhost:3001/api/writings?page=1";
const writing: Writing = { content: "content", title: "title", id: "id", createdAt: new Date().toString() };

const Template = () => (
  <MemoryRouter>
    <BlogPage />
  </MemoryRouter>
);

export const SuccessTemplate: ComponentStory<typeof BlogPage> = () => <Template />;
SuccessTemplate.parameters = {
  msw: [
    rest.get(API_PATH, (req, res, ctx) =>
      res(
        ctx.status(OK),
        ctx.json<WritingPagination>({ list: createWritingFixtureList(10, writing), totalCount: 28 }),
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
