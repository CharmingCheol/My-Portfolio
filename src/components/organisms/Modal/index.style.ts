import styled, { css } from "styled-components";
import { palette } from "styles/palette";

interface Size {
  size: "small" | "small_wide" | "medium" | "medium_wide" | "large" | "large_wide";
}

const size = {
  small: css`
    width: 360px;
    height: 480px;
    padding: 8px;
  `,
  small_wide: css`
    width: 480px;
    height: 360px;
    padding: 8px;
  `,
  medium: css`
    width: 540px;
    height: 640px;
    padding: 12px;
  `,
  medium_wide: css`
    width: 640px;
    height: 540px;
    padding: 12px;
  `,
  large: css`
    width: 720px;
    height: 800px;
    padding: 16px;
  `,
  large_wide: css`
    width: 800px;
    height: 720px;
    padding: 16px;
  `,
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(225, 228, 232, 0.3); /* palette.white80 */
  backdrop-filter: blur(4px);
`;

export const Content = styled.div<Size>`
  background-color: ${palette.white_20};
  border-radius: 8px;
  ${(params) => size[params.size]}
`;
