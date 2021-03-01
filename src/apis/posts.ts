import instance from "./index";

export interface SubmitPostParams {
  body: string;
  category: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
}

interface CategoryPostParams {
  category: string;
  id: string;
}

interface UpdatePostParams extends SubmitPostParams, CategoryPostParams {}

// 글 작성 POST
export const submitPost = ({ body, category, hashtag, thumbnail, title }: SubmitPostParams) => {
  return instance.post("/boards", { body, category, hashtag, thumbnail, title });
};

// 글 수정 PUT
export const updatePost = ({ body, category, hashtag, id, thumbnail, title }: UpdatePostParams) => {
  return instance.put(`/boards/${category}/${id}`, { body, category, hashtag, thumbnail, title });
};

// 글 삭제 DELETE
export const deletePost = ({ category, id }: CategoryPostParams) => {
  return instance.delete(`/boards/${category}/${id}`);
};

// 전체 글 불러오기 GET
export const getTotalPosts = ({ page }: { page: number }) => {
  return instance.get(`/boards?page=${page}`);
};

// 게시글 상세 불러오기 GET
export const getPostDetail = ({ category, id }: CategoryPostParams) => {
  return instance.get(`/boards/${category}/${id}`);
};

// 카테고리 게시글 리스트 불러오기 GET
export const getCategoryPosts = ({ category, page = 1 }: { category: string; page: number }) => {
  return instance.get(`/boards/${category}?page=${page}`);
};

// 카테고리 게시글 수 불러오기 GET
export const getCategoryPostCount = ({ category }: { category: string }) => {
  return instance.get(`/boards/count/${category}`);
};
