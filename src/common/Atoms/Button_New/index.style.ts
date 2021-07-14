import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { buttonPalette } from "@styles/palette";
import { StyleProps } from "./type";

export const color = {
  main: css`
    background-color: ${buttonPalette.main};
    color: ${buttonPalette.sub1};
    border: 1px solid ${buttonPalette.main};
  `,
  sub1: css`
    background-color: ${buttonPalette.sub1};
    color: ${buttonPalette.sub1Border};
    border: 1px solid ${buttonPalette.sub1Border};
  `,
  sub2: css`
    background-color: ${buttonPalette.sub2};
    color: ${buttonPalette.sub1};
    border: 1px solid ${buttonPalette.sub2};
  `,
  outline: css`
    background-color: ${buttonPalette.sub1};
    color: ${buttonPalette.main};
    border: 1px solid ${buttonPalette.main};
  `,
};

export const size = {
  primary: css`
    font-size: 12px;
    padding: 8px 24px;
    svg {
      margin-right: 6px;
    }
  `,
  medium: css`
    font-size: 12px;
    padding: 8px 28px;
    svg {
      margin-right: 4px;
    }
  `,
  large: css`
    font-size: 14px;
    padding: 8px 40px;
    svg {
      margin-right: 4px;
    }
  `,
  xlarge: css`
    font-size: 16px;
    padding: 8px 48px;
    svg {
      margin-right: 4px;
    }
  `,
  xxlarge: css`
    font-size: 18px;
    padding: 8px 54px;
    svg {
      margin-right: 4px;
    }
  `,
};

const baseStyle = (params: StyleProps) => css`
  font-weight: bold;
  cursor: pointer;
  border-radius: ${params.circled ? "50%" : "4px"};
  ${color[params.color || "main"]};
  ${size[params.size || "primary"]};
  &:disabled {
    cursor: default;
  }
  ${() => {
    if (params.circled) {
      return css`
        padding: 20px 10px;
      `;
    }
    return css``;
  }}
`;

export const Button = styled.button<StyleProps>`
  ${(params) => baseStyle(params)}
`;

export const Anchor = styled.a<StyleProps>`
  ${(params) => baseStyle(params)}
`;

export const Link = styled(RouterLink)<StyleProps>`
  ${(params) => baseStyle(params)}
`;
