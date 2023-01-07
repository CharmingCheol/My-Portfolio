export interface Writing {
  createdAt: string;
  id: string;
  content: string;
  title: string;
}

export interface WritingPagination {
  list: Writing[];
  totalCount: number;
}

export type WritingRequestBody = Pick<Writing, "content" | "title">;
