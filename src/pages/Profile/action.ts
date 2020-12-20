import { BackgroundColorKey } from "./type";

export const CLICK_GEAR_ICON = "CLICK_GEAR_ICON" as const;
export const CLICK_LP_COVER = "CLICK_LP_COVER" as const;
export const DRAG_TEXT_VOLUME = "DRAG_TEXT_VOLUME" as const;

export const clickGearIconAction = (payload: boolean) => ({
  type: CLICK_GEAR_ICON,
  payload,
});

export const lpCoverClickAction = (payload: BackgroundColorKey) => ({
  type: CLICK_LP_COVER,
  payload,
});

export const textVolumeDragAction = (payload: number) => ({
  type: DRAG_TEXT_VOLUME,
  payload,
});

export type ProfileActions = ReturnType<
  typeof clickGearIconAction | typeof lpCoverClickAction | typeof textVolumeDragAction
>;
