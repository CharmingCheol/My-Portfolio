export interface CategoryList {
  category: string;
  __v: number;
  _id: string;
}

export interface BoardDetail {
  body: string;
  category: string;
  created_at: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
  _id: string;
}
