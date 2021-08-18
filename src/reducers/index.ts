import { combineReducers } from "redux";
import optionSlice from "./optionSlice";

const reducer = combineReducers({ option: optionSlice });

export default reducer;
