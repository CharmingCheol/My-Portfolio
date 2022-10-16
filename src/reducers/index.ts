import { createContext } from "react";
import { createDispatchHook, createSelectorHook, ReactReduxContextValue } from "react-redux";
import { AnyAction, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import globalUI from "./globalUI";
import option from "./option";

type GlobalState = ReturnType<typeof store.getState>;

export const rootReducer = combineReducers({
  option: option.reducer,
  globalUI: globalUI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const GlobalContext = createContext({} as ReactReduxContextValue<GlobalState, AnyAction>);
export const useAppDispatch = createDispatchHook(GlobalContext);
export const useAppSelector = createSelectorHook(GlobalContext);
