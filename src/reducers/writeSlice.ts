import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultThumbnail from "static/img/skeleton.png";

interface Settings {
  prevThumbnail: string;
  /**
   * 추후 공개/비공개, 해시태그 옵션 추가 예정
   */
}

export interface CounterState extends Settings {
  content: string;
  thumbnail: string;
  title: string;
}

const initialState: CounterState = {
  content: "",
  prevThumbnail: defaultThumbnail,
  thumbnail: defaultThumbnail,
  title: "",
};

export const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    changeContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    changeThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    clearSettings: (state) => {
      state.thumbnail = defaultThumbnail;
    },
    undoSettings: (state) => {
      state.thumbnail = state.prevThumbnail;
    },
    updatePrevSettings: (state, action: PayloadAction<Settings>) => {
      const { prevThumbnail } = action.payload;
      state.prevThumbnail = prevThumbnail;
    },
  },
});

export const {
  changeContent,
  changeThumbnail,
  changeTitle,
  clearSettings,
  undoSettings,
  updatePrevSettings,
} = writeSlice.actions;

export default writeSlice.reducer;
