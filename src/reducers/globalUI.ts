import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  modalKey: string;
}

const initialState: CounterState = {
  modalKey: "",
};

export const globalUI = createSlice({
  name: "globalUI",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalKey = action.payload;
    },
    closeModal: (state) => {
      state.modalKey = "";
    },
  },
});

export const { openModal, closeModal } = globalUI.actions;

export default globalUI.reducer;
