import { color, size } from "./index.style";

export interface AttributeProps {
  className?: string[];
  tabIndex?: number;

  /**
   * 버튼 비활성화를 할 경우, true로 전달
   */
  disabled?: boolean;

  /**
   * 새로운 탭을 생성하고 싶을 경우, true로 전달
   */
  newTab?: boolean;
}

export interface EventProps {
  onBlur?: (param?: unknown) => void;
  onClick?: (param?: unknown) => void;
  onContextMenu?: (param?: unknown) => void;
  onDoubleClick?: (param?: unknown) => void;
  onFocus?: (param?: unknown) => void;
  onMouseDown?: (param?: unknown) => void;
  onMouseEnter?: (param?: unknown) => void;
  onMouseLeave?: (param?: unknown) => void;
  onMouseUp?: (param?: unknown) => void;
  // onFocusVisible?: (param?: unknown) => void;
  // onKeyDown?: (param?: unknown) => void;
  // onKeyUp?: (param?: unknown) => void;
  // onTouchEnd?: (param?: unknown) => void;
  // onTouchMove?: (param?: unknown) => void;
  // onTouchStart?: (param?: unknown) => void;
  // onDragLeave?: (param?: unknown) => void;
}

export interface PathProps {
  /**
   * a 태그인 경우, href에다가 이동 할 페이지 작성
   */
  href?: string;

  /**
   * 페이지 내부 이동 태그인 경우, href에다가 이동 할 페이지 작성
   */
  to?: string;
}

export interface StyleProps {
  /**
   * 원형 버튼으로 출력하고 싶을 경우, true로 전달
   */
  circled?: boolean;

  size?: SizeType;
  color?: ColorType;
}

export type ColorType = keyof typeof color;
export type SizeType = keyof typeof size;
