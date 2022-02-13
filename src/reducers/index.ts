import { combineReducers } from "redux";

import globalUI from "./globalUI";
import optionSlice from "./optionSlice";

const reducer = combineReducers({ option: optionSlice, globalUI });

export default reducer;
