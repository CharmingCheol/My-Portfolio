import styled, { css } from "styled-components";
import { palette } from "styles/palette";
import { StyleProps } from "./type";

export const size = {
  small: css`
    padding: 2px;
    svg {
      width: 12px;
      height: 12px;
    }
  `,
  medium: css`
    padding: 2px;
    svg {
      width: 15px;
      height: 15px;
    }
  `,
  large: css`
    padding: 4px;
    svg {
      width: 18px;
      height: 18px;
    }
  `,
  xlarge: css`
    padding: 6px;
    svg {
      width: 21px;
      height: 21px;
    }
  `,
  xxlarge: css`
    padding: 8px;
    svg {
      width: 24px;
      height: 24px;
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
    const { backgroundColor, borderColor, disabled, disabledColor, iconColor } = params;
    if (borderColor) {
      return css`
        border: 1px solid ${palette[borderColor] || "none"};
      `;
    }
    if (backgroundColor) {
      return css`
        background-color: ${palette[backgroundColor] || "none"};
      `;
    }
    if (iconColor) {
      return css`
        svg {
          color: ${palette[iconColor || "black_100"]};
        }
      `;
    }
    if (disabled) {
      return css`
        svg {
          pointer-events: none;
          color: ${palette[disabledColor || "gray_100"]};
        }
      `;
    }
  }}
`;
