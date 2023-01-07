import React, { ReactNode } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit";

import { createWritingFixture } from "fixtures/writing";
import { Writing } from "types/writing";

interface WritingState {
  isNotFound: boolean;
  writingDetail: Writing;
}

const initialState: WritingState = {
  isNotFound: false,
  writingDetail: createWritingFixture(),
};

const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    setIsNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
    initWritingDetail: (state, action: PayloadAction<Writing>) => {
      state.writingDetail = action.payload;
    },
  },
});

const WritingProvider = ({ children }: { children: ReactNode }) => {
  const store = createStore(writingSlice.reducer);
  return <Provider store={store}>{children}</Provider>;
};

export default WritingProvider;

export const writingActions = writingSlice.actions;
export const useWritingDispatch = () => useDispatch();
export const useWritingSelector: TypedUseSelectorHook<ReturnType<typeof writingSlice.reducer>> = useSelector;
