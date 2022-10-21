import React, { ReactNode } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit";

import { Writing, WritingPagination } from "types/writing";

interface BlogState {
  writingPagination: WritingPagination;
}

const initialState: BlogState = {
  writingPagination: { list: [], totalCount: 0 },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    initWritingPagination: (state, action: PayloadAction<WritingPagination>) => {
      state.writingPagination = action.payload;
    },
    updateWritingList: (state, action: PayloadAction<Writing[]>) => {
      state.writingPagination.list = action.payload;
    },
  },
});

const BlogProvider = ({ children }: { children: ReactNode }) => {
  const store = createStore(blogSlice.reducer);
  return <Provider store={store}>{children}</Provider>;
};

export default BlogProvider;

export const blogActions = blogSlice.actions;
export const useBlogDispatch = () => useDispatch();
export const useBlogSelector: TypedUseSelectorHook<ReturnType<typeof blogSlice.reducer>> = useSelector;
