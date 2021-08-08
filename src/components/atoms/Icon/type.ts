import { PaletteType } from "styles/palette";
import { size } from "./index.style";

export type IconSize = keyof typeof size;

export interface StyleProps {
  backgroundColor: PaletteType;
  borderColor: PaletteType;
  disabled: boolean;
  disabledColor: PaletteType;
  iconColor: PaletteType;
  iconSize: IconSize;
}
