import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Writing } from "types/writing";

export interface WritingState {
  tempWriting: Partial<Writing>;
}

const initialState: WritingState = {
  tempWriting: {},
};

const writing = createSlice({
  name: "writing",
  initialState,
  reducers: {
    initWriting: (state, action: PayloadAction<Writing>) => {
      state.tempWriting = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.tempWriting.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.tempWriting.content = action.payload;
    },
    clearWriting: (state) => {
      state.tempWriting = {};
    },
  },
});

export const writingActions = writing.actions;

export default writing;
