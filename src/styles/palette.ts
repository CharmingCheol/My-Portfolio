export const palette = {
  // navy - page에서 대표적으로 사용하는 color
  navy_20: "#EFF8FC",
  navy_40: "#DFF0F9",
  navy_60: "#CAE0EF",
  navy_80: "#B4CCE0",
  navy_100: "#97B1CC",

  // white - main color의 sub가 되는 color
  white_20: "#FBFCFD",
  white_40: "#F7F9FB",
  white_60: "#EEF0F3",
  white_80: "#E1E4E8",
  white_100: "#d1d4d9",

  // red - 실패, 에러 등과 같이 부정적인 메시지를 전달하는 color
  red_20: "#FDDFD3",
  red_40: "#FBB9A8",
  red_60: "#F3897A",
  red_80: "#E75C58",
  red_100: "#D72631",

  // green - 성공과 같이 긍정적인 메시지를 전달하는 color
  green_20: "#C9FCDA",
  green_40: "#95F9C0",
  green_60: "#5FEDAA",
  green_80: "#37DC9E",
  green_100: "#00c58f",

  // black - font에서 대표적으로 사용되는 color
  black_20: "#3c3c3c",
  black_40: "#323232",
  black_60: "#282828",
  black_80: "#1e1e1e",
  black_100: "#141414",

  // gray - black text color와 구분짓기 위해 사용되는 sub color
  gray_20: "#F6F9FB",
  gray_40: "#EEF3F7",
  gray_60: "#DCE2E9",
  gray_80: "#C4CBD3",
  gray_100: "#a5acb6",

  /* etc */
};
export type PaletteType = keyof typeof palette;

export const buttonPalette = {
  main: palette.navy_100,
  sub1: palette.gray_100,
  sub2: palette.black_20,
};
export type ButtonPalette = keyof typeof buttonPalette;
