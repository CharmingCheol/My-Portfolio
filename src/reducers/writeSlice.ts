import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  prevThumbnail: string | null;
  thumbnail: string | null;
}

const initialState: CounterState = {
  prevThumbnail: null,
  thumbnail: null,
};

export const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    claerAll: (state) => {
      state.prevThumbnail = null;
      state.thumbnail = null;
    },
    clearSettings: (state) => {
      state.thumbnail = null;
    },
    undoSettings: (state) => {
      state.thumbnail = state.prevThumbnail;
    },
    updatePrevSettings: (state, action: PayloadAction<Partial<CounterState>>) => {
      const { prevThumbnail } = action.payload;
      if (prevThumbnail) state.prevThumbnail = prevThumbnail;
    },
  },
});

export const { changeThumbnail, claerAll, clearSettings, undoSettings, updatePrevSettings } = writeSlice.actions;

export default writeSlice.reducer;
