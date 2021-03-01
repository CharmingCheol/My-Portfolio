import React, { createContext, useMemo, useReducer, Dispatch } from "react";
import produce from "immer";
import { ADD_ALERT, REMOVE_ALERT, AlertListAction } from "./action";

interface AlertInfo {
  index: string;
  text: string;
  status: "success" | "error";
}

interface ReducerState {
  alertList: AlertInfo[];
}

interface Context extends ReducerState {
  dispatch: Dispatch<AlertListAction>;
}

export const AlertListContext = createContext<Context>({
  alertList: [],
  dispatch: () => {},
});

const initialState: ReducerState = {
  alertList: [],
};

const reducer = (state: ReducerState = initialState, action: AlertListAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 알람 추가
      case ADD_ALERT: {
        const index = Math.random().toFixed(4);
        const alertInfo = { index, ...action.payload };
        draft.alertList.push(alertInfo);
        break;
      }
      // 일람 시간 경과 후 삭제
      case REMOVE_ALERT: {
        const index = draft.alertList.findIndex((alert) => alert.index === action.payload);
        if (index !== -1) draft.alertList.splice(index, 1);
        break;
      }
      default:
        break;
    }
  });
};

const AlertListProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { alertList } = state;
  const value = useMemo(() => ({ dispatch, alertList }), [alertList]);

  return (
    <>
      <AlertListContext.Provider value={value}>{children}</AlertListContext.Provider>
    </>
  );
};

export default AlertListProvider;
