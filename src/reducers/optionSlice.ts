import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isAdmin: boolean | null;
}

const initialState: CounterState = {
  isAdmin: null,
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

export default optionSlice.reducer;
