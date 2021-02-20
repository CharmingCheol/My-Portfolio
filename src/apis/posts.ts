import instance from "./index";

export interface SubmitPostParams {
  body: string;
  category: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
}

// 글 작성 POST
export const submitPost = ({ body, category, hashtag, thumbnail, title }: SubmitPostParams) => {
  return instance.post("/boards", { body, category, hashtag, thumbnail, title });
};

// 전체 글 불러오기 GET
export const getTotalPosts = ({ page }: { page: number }) => {
  return instance.get(`/boards?page=${page}`);
};
