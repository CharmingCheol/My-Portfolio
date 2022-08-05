import { combineReducers } from "redux";

import globalUI from "./globalUI";
import option from "./option";

const reducer = combineReducers({ option, globalUI });

export default reducer;
