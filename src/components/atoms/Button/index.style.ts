import styled, { css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { buttonPalette, palette } from "@styles/palette";
import { StyleProps } from "./type";

export const color = {
  main: css`
    background-color: ${buttonPalette.main};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
  `,
  main_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.main};
    border: 1px solid ${buttonPalette.main};
  `,
  sub1: css`
    background-color: ${buttonPalette.sub1};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
  `,
  sub1_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.sub1};
    border: 1px solid ${buttonPalette.sub1};
  `,
  sub2: css`
    background-color: ${buttonPalette.sub2};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
  `,
  sub2_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.sub2};
    border: 1px solid ${buttonPalette.sub2};
  `,
};

export const size = {
  small: css`
    font-size: 12px;
    height: 28px;
    padding: 5px;
    svg {
      margin-right: 6px;
    }
  `,
  medium: css`
    font-size: 12px;
    height: 32px;
    padding: 6px;
    svg {
      margin-right: 6px;
    }
  `,
  large: css`
    font-size: 14px;
    height: 36px;
    padding: 7px;
    svg {
      margin-right: 6px;
    }
  `,
  xlarge: css`
    font-size: 16px;
    height: 44px;
    padding: 8px;
    svg {
      margin-right: 6px;
    }
  `,
  xxlarge: css`
    font-size: 18px;
    height: 50px;
    padding: 9px;
    svg {
      margin-right: 6px;
    }
  `,
};

const baseStyle = (params: StyleProps) => css`
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  ${color[params.color || "main"]};
  ${size[params.size || "medium"]};
  &:disabled {
    cursor: default;
  }
`;

export const Button = styled.button<StyleProps>`
  ${(params) => baseStyle(params)}
`;

export const Anchor = styled.a<StyleProps>`
  ${(params) => baseStyle(params)}
  display: inline-flex;
  align-items: center;
`;

export const Link = styled(RouterLink)<StyleProps>`
  ${(params) => baseStyle(params)}
  display: inline-flex;
  align-items: center;
`;
