import React, { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import { rest } from "msw";

import { useAppDispatch } from "store";
import { changeIsAdmin } from "reducers/option";
import { Header, MainLayout } from "common";

import Writing from "./index";
import writingJson from "../../../cypress/fixtures/writing.json";

export default {
  title: "pages/Writing",
  component: Writing,
} as Meta;

const PATH = "http://localhost:3001/api/writings?id=1234";

const WritingPageTemplate = () => {
  return (
    <MemoryRouter>
      <Header />
      <MainLayout>
        <Writing />
      </MainLayout>
    </MemoryRouter>
  );
};
const WritingPage = WritingPageTemplate.bind({});

export const SuccessBehavior = () => <WritingPage />;
SuccessBehavior.parameters = {
  msw: [
    rest.get(PATH, (req, res, ctx) => {
      return res(ctx.json(writingJson));
    }),
  ],
};

export const FailureBehavior = () => <WritingPage />;
FailureBehavior.parameters = {
  msw: [
    rest.get(PATH, (req, res, ctx) => {
      return res(ctx.status(404));
    }),
  ],
};

export const AdminWritingPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeIsAdmin(true));
    return () => {
      dispatch(changeIsAdmin(false));
    };
  }, [dispatch]);

  return <WritingPage />;
};
AdminWritingPage.parameters = {
  msw: [
    rest.get(PATH, (req, res, ctx) => {
      return res(ctx.json(writingJson));
    }),
  ],
};
