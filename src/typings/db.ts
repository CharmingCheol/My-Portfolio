export interface CategoryList {
  category: string;
  __v: number;
  _id: string;
}

export interface BoardDetail {
  body: string;
  category: string;
  createdAt: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
  _id: string;
}
