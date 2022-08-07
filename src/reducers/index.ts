import { combineReducers } from "redux";

import globalUI from "./globalUI";
import option from "./option";
import writing from "./writing";

const reducer = combineReducers({ option: option.reducer, globalUI: globalUI.reducer, writing: writing.reducer });

export default reducer;
