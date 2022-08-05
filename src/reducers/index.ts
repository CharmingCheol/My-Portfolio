import { combineReducers } from "redux";

import globalUI from "./globalUI";
import option from "./option";

const reducer = combineReducers({ option: option.reducer, globalUI: globalUI.reducer });

export default reducer;
