import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Writing, WritingPagination } from "types/writing";

export interface WritingState {
  tempWriting: Partial<Writing>;
  writingPagination: WritingPagination;
}

export const initialState: WritingState = {
  tempWriting: {},
  writingPagination: { list: [], totalCount: 0 },
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
    initWritingPagination: (state, action: PayloadAction<WritingPagination>) => {
      state.writingPagination = action.payload;
    },
    updateWritingList: (state, action: PayloadAction<Writing[]>) => {
      state.writingPagination.list = action.payload;
    },
    clearWritingPagination: (state) => {
      state.writingPagination = { list: [], totalCount: 0 };
    },
  },
});

export const writingActions = writing.actions;

export default writing;
