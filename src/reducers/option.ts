import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OptionState {
  isAdmin: boolean;
}

const initialState: OptionState = {
  isAdmin: false,
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    changeIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { changeIsAdmin } = optionSlice.actions;
export const optionActions = optionSlice.actions;

export default optionSlice;
