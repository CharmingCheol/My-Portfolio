import styled, { css } from "styled-components";
import { palette } from "styles/palette";
import { StyleProps } from "./type";

export const size = {
  small: css`
    padding: 4px;
    svg {
      width: 16px;
      height: 16px;
    }
  `,
  medium: css`
    padding: 4px;
    svg {
      width: 18px;
      height: 18px;
    }
  `,
  large: css`
    padding: 6px;
    svg {
      width: 22px;
      height: 22px;
    }
  `,
  xlarge: css`
    padding: 8px;
    svg {
      width: 26px;
      height: 26px;
    }
  `,
  xxlarge: css`
    padding: 10px;
    svg {
      width: 30px;
      height: 30px;
    }
  `,
};

export const Icon = styled.div<Partial<StyleProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &.icon-button {
    svg {
      cursor: pointer;
    }
  }
  ${(params) => size[params.iconSize || "small"]}
  ${(params) => {
    if (params.borderColor) {
      return css`
        border: 1px solid ${palette[params.borderColor] || "none"};
      `;
    }
    if (params.backgroundColor) {
      return css`
        background-color: ${palette[params.backgroundColor] || "none"};
      `;
    }
    if (params.iconColor) {
      return css`
        svg {
          color: ${palette[params.iconColor || "black_100"]};
        }
      `;
    }
  }}
`;
