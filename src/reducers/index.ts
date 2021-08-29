import { combineReducers } from "redux";
import writeSlice from "./writeSlice";

const reducer = combineReducers({ write: writeSlice });

export default reducer;
