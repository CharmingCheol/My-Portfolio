import React, { ReactNode } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit";

import { createWritingFixture } from "fixtures/writing";
import { Writing } from "types/writing";

interface WriteState {
  writing: Writing;
}

const initialState: WriteState = {
  writing: createWritingFixture(),
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    initWriting: (state, action: PayloadAction<Writing>) => {
      state.writing = action.payload;
    },
    changeContent: (state, action: PayloadAction<string>) => {
      state.writing.content = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.writing.title = action.payload;
    },
  },
});

const WriteProvider = ({ children }: { children: ReactNode }) => {
  const store = createStore(writeSlice.reducer);
  return <Provider store={store}>{children}</Provider>;
};

export default WriteProvider;

export const writeActions = writeSlice.actions;
export const useWriteDispatch = () => useDispatch();
export const useWriteSelector: TypedUseSelectorHook<ReturnType<typeof writeSlice.reducer>> = useSelector;
