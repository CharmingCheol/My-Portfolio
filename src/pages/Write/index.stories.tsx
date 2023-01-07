import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta } from "@storybook/react";

import WritePage from "./index";
import { Writing } from "types/writing";
import { createWritingFixture } from "fixtures/writing";
import { GlobalContext } from "reducers";

const MockGlobalStore: React.FunctionComponent = ({ children }) => (
  <Provider context={GlobalContext} store={configureStore({ reducer: {} })}>
    {children}
  </Provider>
);

const Template = ({ state }: DeepPartial<{ state: Writing }>) => {
  const history = createMemoryHistory({ initialEntries: [{ state }] });
  return (
    <MemoryRouter>
      <MockGlobalStore>
        <Route location={history.location} component={WritePage} />
      </MockGlobalStore>
    </MemoryRouter>
  );
};

export const BaseTemplate = () => <Template />;

export const NavigatedTemplate = () => (
  <Template state={createWritingFixture({ id: "1234", content: "content", title: "title" })} />
);

export default {
  title: "pages/Write",
  component: WritePage,
} as ComponentMeta<typeof WritePage>;
