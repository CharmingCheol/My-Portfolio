export const ADD_ALERT = "ADD_ALERT" as const;
export const REMOVE_ALERT = "REMOVE_ALERT" as const;

// 알람 추가
export const addAlert = ({ status, text }: { status: "success" | "error"; text: string }) => ({
  type: ADD_ALERT,
  payload: {
    status,
    text,
  },
});

// 알람 삭제
export const removeAlert = (index: string) => ({
  type: REMOVE_ALERT,
  payload: index,
});

export type AlertListAction = ReturnType<typeof addAlert | typeof removeAlert>;
