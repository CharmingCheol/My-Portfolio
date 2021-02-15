export const CAHANGE_BODY = "CAHANGE_BODY" as const;
export const CAHANGE_TITLE = "CAHANGE_TITLE" as const;

// 본문 변경
export const changeBody = (payload: string) => ({
  type: CAHANGE_BODY,
  payload,
});

// 제목 변경
export const changeTitleAction = (payload: string) => ({
  type: CAHANGE_TITLE,
  payload,
});

export type MarkDownEditorAction = ReturnType<typeof changeBody | typeof changeTitleAction>;
