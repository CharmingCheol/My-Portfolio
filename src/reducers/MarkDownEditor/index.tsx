import React, { createContext, useMemo, useReducer, Dispatch } from "react";
import produce from "immer";
import { CAHANGE_BODY, CAHANGE_TITLE, MarkDownEditorAction } from "./action";

interface ReducerState {
  body: string; // 본문
  title: string; // 제목
}

interface Context extends ReducerState {
  dispatch: Dispatch<MarkDownEditorAction>;
}

export const MarkDownEditorContext = createContext<Context>({
  body: "",
  dispatch: () => {},
  title: "",
});

const initialState: ReducerState = {
  body: "",
  title: "",
};

const reducer = (state: ReducerState = initialState, action: MarkDownEditorAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 본문 변경
      case CAHANGE_BODY:
        draft.body = action.payload;
        break;
      // 제목 변경
      case CAHANGE_TITLE:
        draft.title = action.payload;
        break;
        break;
      default:
        break;
    }
  });
};

const MarkDownEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { body, title } = state;
  const value = useMemo(() => ({ dispatch, body, title }), [body, title]);

  return (
    <>
      <MarkDownEditorContext.Provider value={value}>{children}</MarkDownEditorContext.Provider>
    </>
  );
};

export default MarkDownEditorProvider;
