import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Writing } from "types/writing";

type Nullable<T> = T | null;

export interface WritingState {
  writing: Nullable<Writing>;
}

const initialState: WritingState = {
  writing: null,
};

const writing = createSlice({
  name: "writing",
  initialState,
  reducers: {
    initWriting: (state, action: PayloadAction<Writing>) => {
      state.writing = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      if (state.writing) {
        state.writing.title = action.payload;
      }
    },
    setContent: (state, action: PayloadAction<string>) => {
      if (state.writing) {
        state.writing.content = action.payload;
      }
    },
    clearWriting: (state) => {
      state.writing = null;
    },
  },
});

export const writingActions = writing.actions;

export default writing;
