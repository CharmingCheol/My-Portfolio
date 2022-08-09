import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory } from "@storybook/react";

import writingSlice, { initialState, WritingState } from "reducers/writing";

import Write from "./index";

const MockStore = ({ state, children }: { state: Partial<WritingState>; children: React.ReactChild }) => (
  <Provider
    store={configureStore({
      reducer: {
        writing: createSlice({
          name: writingSlice.name,
          reducers: writingSlice.caseReducers,
          initialState: { ...initialState, ...state },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const BaseTemplate: ComponentStory<typeof Write> = () => <Write />;
BaseTemplate.decorators = [(story) => <MockStore state={{ tempWriting: {} }}>{story()}</MockStore>];

export const EditedTemplate: ComponentStory<typeof Write> = () => <Write />;
EditedTemplate.decorators = [
  (story) => (
    <MockStore
      state={{ tempWriting: { content: "content", title: "title", id: "id", createdAt: new Date().toString() } }}
    >
      {story()}
    </MockStore>
  ),
];

export default {
  title: "pages/Write",
  component: Write,
};
