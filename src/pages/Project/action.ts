export const CLICK_PHOTO_FRAME = "CLICK_PHOTO_FRAME" as const;
export const CLICK_POPUP_CLOSE = "CLICK_POPUP_CLOSE" as const;

export const clickPhotoFrameAction = (payload: string) => ({
  type: CLICK_PHOTO_FRAME,
  payload,
});

export const clickPopupCloseAction = () => ({
  type: CLICK_POPUP_CLOSE,
});

export type ProfileActions = ReturnType<typeof clickPhotoFrameAction | typeof clickPopupCloseAction>;
