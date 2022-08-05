import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalKey } from "types/globalUI";

export interface GlobalUIState {
  modalKey: ModalKey;
}

const initialState: GlobalUIState = {
  modalKey: "",
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
  },
});

export const { openModal, closeModal } = globalUI.actions;
export const globalUIActions = globalUI.actions;

export default globalUI;
