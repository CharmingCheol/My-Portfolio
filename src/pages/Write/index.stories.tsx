import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ComponentMeta } from "@storybook/react";

import WritePage from "./index";
import { Writing } from "types/writing";
import { createWritingFixture } from "fixtures/writing";

const Template = ({ state }: DeepPartial<{ state: Writing }>) => {
  const history = createMemoryHistory<DeepPartial<Writing>>();
  if (state) {
    history.location.state = state;
  }
  return (
    <MemoryRouter>
      <Route location={history.location} component={WritePage} />
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
