import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GlobalContext, rootReducer } from "reducers";
import globalUISlice from "reducers/globalUI";

import WritingDeleteModal from "./index";

export default {
  title: "common/modals/writing-delete-modal",
  component: WritingDeleteModal,
} as ComponentMeta<typeof WritingDeleteModal>;

interface Props {
  reducer: ReturnType<typeof rootReducer>;
  children: React.ReactChild;
}

const MockStore = ({ reducer, children }: DeepPartial<Props>) => (
  <Provider
    context={GlobalContext}
    store={configureStore({
      reducer: {
        globalUI: createSlice({
          name: globalUISlice.name,
          reducers: {},
          initialState: reducer?.globalUI || globalUISlice.reducer,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const BaseTemplate: ComponentStory<typeof WritingDeleteModal> = () => (
  <MemoryRouter>
    <MockStore reducer={{ globalUI: { modalKey: "WritingDeleteModal" } }}>
      <WritingDeleteModal />
    </MockStore>
  </MemoryRouter>
);
