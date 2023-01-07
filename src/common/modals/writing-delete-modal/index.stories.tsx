import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import WritingProvider from "pages/Writing/index.reducer";
import { GlobalContext, rootReducer } from "reducers";
import globalUISlice, { initialState as globalUIState } from "reducers/globalUI";

import WritingDeleteModal from "./index";

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
          reducers: globalUISlice.caseReducers as any,
          initialState: reducer?.globalUI || globalUIState,
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
      <WritingProvider>
        <WritingDeleteModal />
      </WritingProvider>
    </MockStore>
  </MemoryRouter>
);

export default {
  title: "common/modals/writing-delete-modal",
  component: WritingDeleteModal,
} as ComponentMeta<typeof WritingDeleteModal>;
