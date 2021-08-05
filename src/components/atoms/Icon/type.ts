import { PaletteType } from "styles/palette";
import { iconSize } from "./index.style";

export type IconSize = keyof typeof iconSize;

export interface StyleProps {
  backgroundColor: PaletteType;
  borderColor: PaletteType;
  size: IconSize;
}
