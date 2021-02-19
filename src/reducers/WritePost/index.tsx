import React, { createContext, useMemo, useReducer, Dispatch } from "react";
import produce from "immer";
import {
  WritePostAction,
  ADD_HASH_TAG,
  ADD_IMAGE_LIST,
  CAHANGE_BODY,
  CHANGE_CATEGORY,
  CHANGE_THUMBNAIL,
  CAHANGE_TITLE,
  REMOVE_HASH_TAG,
} from "./action";

interface WritePostState {
  body: string;
  category: string;
  hashtag: string[];
  imageList: string[];
  thumbnail: string;
  title: string;
}

interface Context extends WritePostState {
  dispatch: Dispatch<WritePostAction>;
}

const initialState: WritePostState = {
  body: "",
  category: "",
  hashtag: [],
  imageList: [],
  thumbnail: "",
  title: "",
};

export const WritePostContext = createContext<Context>({
  body: "",
  category: "",
  dispatch: () => {},
  hashtag: [],
  imageList: [],
  thumbnail: "",
  title: "",
});

const reducer = (state: WritePostState = initialState, action: WritePostAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 해시태그 추가
      case ADD_HASH_TAG:
        draft.hashtag.push(action.payload);
        break;
      // 이미지 리스트 추가
      case ADD_IMAGE_LIST:
        draft.imageList.push(action.payload);
        break;
      // 본문 변경
      case CAHANGE_BODY:
        draft.body = action.payload;
        break;
      // 모집 조건 작성
      case CHANGE_CATEGORY:
        draft.category = action.payload;
        break;
      // 썸네일 변경
      case CHANGE_THUMBNAIL:
        draft.thumbnail = action.payload;
        break;
      // 제목 변경
      case CAHANGE_TITLE:
        draft.title = action.payload;
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
  const { body, category, hashtag, imageList, thumbnail, title } = state;
  const value = useMemo(() => ({ body, category, dispatch, hashtag, imageList, thumbnail, title }), [
    body,
    category,
    hashtag,
    imageList,
    thumbnail,
    title,
  ]);

  return (
    <>
      <WritePostContext.Provider value={value}>{children}</WritePostContext.Provider>
    </>
  );
};

export default WritePostProvider;
