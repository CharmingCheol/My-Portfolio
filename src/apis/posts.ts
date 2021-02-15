import instance from "./index";

export interface SubmitPostParams {
  body: string;
  category: string;
  hashtag: string[];
  title: string;
}

// 글 작성 POST
export const submitPost = ({ body, category, hashtag, title }: SubmitPostParams) => {
  return instance.post("/boards", { body, category, hashtag, title });
};
