import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OptionState {
  isAdmin: boolean;
}

export const initialState: OptionState = {
  isAdmin: false,
};

const option = createSlice({
  name: "option",
  initialState,
  reducers: {
    changeIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const optionActions = option.actions;

export default option;
