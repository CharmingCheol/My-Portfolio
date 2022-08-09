import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory } from "@storybook/react";

import writingSlice, { initialState, WritingState } from "reducers/writing";
import { Writing } from "types/writing";

import Blog from "./index";

const writingList = Array(10)
  .fill(0)
  .map<Writing>((_, i) => ({ content: "content", title: "title", id: String(i), createdAt: new Date().toString() }));

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

export const EmptyListTemplate = () => (
  <MemoryRouter>
    <Blog />
  </MemoryRouter>
);

export const WritingListTemplate: ComponentStory<typeof Blog> = () => (
  <MemoryRouter>
    <Blog />
  </MemoryRouter>
);
WritingListTemplate.decorators = [
  (story) => <MockStore state={{ writingPagination: { list: writingList, totalCount: 15 } }}>{story()}</MockStore>,
];

export default {
  title: "pages/Blog",
  component: Blog,
};
