export const ADD_HASH_TAG = "writeProject/ADD_HASH_TAG" as const;
export const CHANGE_CATEGORY = "writeProject/CHANGE_CATEGORY" as const;
export const REMOVE_HASH_TAG = "writeProject/REMOVE_HASH_TAG" as const;

// 해시태그 추가
export const addHashTag = (hashTag: string) => ({
  type: ADD_HASH_TAG,
  payload: hashTag,
});

// 카테고리 변경
export const changeCategory = (condition: string) => ({
  type: CHANGE_CATEGORY,
  payload: condition,
});

// 해시태그 삭제
export const removeHashTag = (index: number) => ({
  type: REMOVE_HASH_TAG,
  payload: index,
});

export type WritePostAction = ReturnType<typeof addHashTag | typeof changeCategory | typeof removeHashTag>;
