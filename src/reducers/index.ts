import { combineReducers } from "redux";
import optionSlice from "./optionSlice";
import writeSlice from "./writeSlice";

const reducer = combineReducers({ option: optionSlice, write: writeSlice });

export default reducer;
