import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GlobalUIState } from "reducers/globalUI";

import WritingDeleteModal from "./index";

export default {
  title: "common/modals/writing-delete-modal",
  component: WritingDeleteModal,
} as ComponentMeta<typeof WritingDeleteModal>;

const MockStore = <State extends GlobalUIState>({ state, children }: { state: State; children: React.ReactChild }) => (
  <Provider
    store={configureStore({
      reducer: {
        globalUI: createSlice<State, SliceCaseReducers<State>>({
          name: "globalUI",
          reducers: {},
          initialState: state,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const BaseTemplate: ComponentStory<typeof WritingDeleteModal> = () => (
  <MemoryRouter>
    <WritingDeleteModal />
  </MemoryRouter>
);
BaseTemplate.decorators = [(story) => <MockStore state={{ modalKey: "WritingDeleteModal" }}>{story()}</MockStore>];
