import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalKey } from "types/globalUI";

interface GlobalUIState {
  modalKey: ModalKey;
  toastList: string[];
}

export const initialState: GlobalUIState = {
  modalKey: "",
  toastList: [],
};

const globalUI = createSlice({
  name: "globalUI",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalKey>) => {
      state.modalKey = action.payload;
    },
    closeModal: (state) => {
      state.modalKey = "";
    },
    addToast: (state, action: PayloadAction<{ message: string }>) => {
      state.toastList.push(action.payload.message);
    },
    clearToast: (state) => {
      state.toastList = [];
    },
  },
});

export const globalUIActions = globalUI.actions;

export default globalUI;
