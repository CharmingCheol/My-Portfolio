export const ADD_HASH_TAG = "writePost/ADD_HASH_TAG" as const;
export const ADD_IMAGE_LIST = "writePost/ADD_IMAGE_LIST" as const;
export const CAHANGE_BODY = "writePost/CAHANGE_BODY" as const;
export const CHANGE_CATEGORY = "writePost/CHANGE_CATEGORY" as const;
export const CHANGE_THUMBNAIL = "writePost/CHANGE_THUMBNAIL" as const;
export const CAHANGE_TITLE = "writePost/CAHANGE_TITLE" as const;
export const REMOVE_HASH_TAG = "writePost/REMOVE_HASH_TAG" as const;
export const INITIALIZE_POST_DATA = "writePost/INITIALIZE_POST_DATA" as const;

interface InitializePostData {
  title: string;
  hashtag: string[];
  body: string;
  category: string;
  thumbnail: string;
}

// 해시태그 추가
export const addHashTag = (hashTag: string) => ({
  type: ADD_HASH_TAG,
  payload: hashTag,
});

// 이미지 리스트 추가
export const addImageList = (image: string) => ({
  type: ADD_IMAGE_LIST,
  payload: image,
});

// 본문 변경
export const changeBody = (payload: string) => ({
  type: CAHANGE_BODY,
  payload,
});

// 카테고리 변경
export const changeCategory = (condition: string) => ({
  type: CHANGE_CATEGORY,
  payload: condition,
});

// 썸네일 변경
export const changeThumbnail = (image: string) => ({
  type: CHANGE_THUMBNAIL,
  payload: image,
});

// 제목 변경
export const changeTitle = (payload: string) => ({
  type: CAHANGE_TITLE,
  payload,
});

// 해시태그 삭제
export const removeHashTag = (index: number) => ({
  type: REMOVE_HASH_TAG,
  payload: index,
});

// 수정 게시글 데이터 세팅
export const initializePostData = ({ title, hashtag, body, category, thumbnail }: InitializePostData) => ({
  type: INITIALIZE_POST_DATA,
  payload: { title, hashtag, body, category, thumbnail },
});

export type WritePostAction = ReturnType<
  | typeof addHashTag
  | typeof addImageList
  | typeof changeBody
  | typeof changeCategory
  | typeof changeThumbnail
  | typeof changeTitle
  | typeof removeHashTag
  | typeof initializePostData
>;
