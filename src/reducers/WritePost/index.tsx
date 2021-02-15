import React, { createContext, useMemo, useReducer, Dispatch } from "react";
import produce from "immer";
import { WritePostAction, ADD_HASH_TAG, CHANGE_CATEGORY, REMOVE_HASH_TAG } from "./action";

interface WritePostState {
  category: string;
  hashtag: string[];
}

interface Context extends WritePostState {
  dispatch: Dispatch<WritePostAction>;
}

const initialState: WritePostState = {
  category: "",
  hashtag: [],
};

export const WritePostContext = createContext<Context>({
  category: "",
  dispatch: () => {},
  hashtag: [],
});

const reducer = (state: WritePostState = initialState, action: WritePostAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 해시태그 추가
      case ADD_HASH_TAG:
        draft.hashtag.push(action.payload);
        break;
      // 모집 조건 작성
      case CHANGE_CATEGORY:
        draft.category = action.payload;
        break;
      // 태그 삭제
      case REMOVE_HASH_TAG:
        draft.hashtag = [
          ...draft.hashtag.slice(0, action.payload),
          ...draft.hashtag.slice(action.payload + 1, draft.hashtag.length),
        ];
        break;
      default:
        break;
    }
  });
};

const WritePostProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { category, hashtag } = state;
  const value = useMemo(() => ({ category, dispatch, hashtag }), [category, hashtag]);

  return (
    <>
      <WritePostContext.Provider value={value}>{children}</WritePostContext.Provider>
    </>
  );
};

export default WritePostProvider;
