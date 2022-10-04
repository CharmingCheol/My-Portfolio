import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createWritingFixture } from "fixtures/writing.fixture";
import { Writing, WritingPagination } from "types/writing";

export interface WritingState {
  tempWriting: Writing;
  writingDetail: Writing;
  writingPagination: WritingPagination;
}

export const initialState: WritingState = {
  tempWriting: createWritingFixture(),
  writingDetail: createWritingFixture(),
  writingPagination: { list: [], totalCount: 0 },
};

const writing = createSlice({
  name: "writing",
  initialState,
  reducers: {
    initTempWriting: (state) => {
      state.tempWriting = state.writingDetail;
      writingActions.clearWritingDetail();
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.tempWriting.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.tempWriting.content = action.payload;
    },
    clearTempWriting: (state) => {
      state.tempWriting = createWritingFixture();
    },
    initWritingDetail: (state, action: PayloadAction<Writing>) => {
      state.writingDetail = action.payload;
    },
    clearWritingDetail: (state) => {
      state.writingDetail = createWritingFixture();
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
