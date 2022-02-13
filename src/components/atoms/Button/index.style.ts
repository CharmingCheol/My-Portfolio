import styled, { css } from "styled-components";

import { buttonPalette, palette } from "styles/palette";

export interface StyleProps {
  color?: keyof typeof colorTemplate;

  size?: keyof typeof sizeTemplate;
}

export const colorTemplate = {
  main: css`
    background-color: ${buttonPalette.main};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
    svg,
    span,
    a {
      color: ${palette.white_20};
    }
  `,
  main_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.main};
    border: 1px solid ${buttonPalette.main};
    svg,
    span,
    a {
      color: ${buttonPalette.main};
    }
  `,
  sub1: css`
    background-color: ${buttonPalette.sub1};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
    svg,
    span,
    a {
      color: ${palette.white_20};
    }
  `,
  sub1_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.sub1};
    border: 1px solid ${buttonPalette.sub1};
    svg,
    span,
    a {
      color: ${buttonPalette.sub1};
    }
  `,
  sub2: css`
    background-color: ${buttonPalette.sub2};
    color: ${palette.white_20};
    border: 1px solid ${palette.white_20};
    svg,
    span,
    a {
      color: ${palette.white_20};
    }
  `,
  sub2_away: css`
    background-color: ${palette.white_20};
    color: ${buttonPalette.sub2};
    border: 1px solid ${buttonPalette.sub2};
    svg,
    span,
    a {
      color: ${buttonPalette.sub2};
    }
  `,
};

export const sizeTemplate = {
  small: css`
    font-size: 12px;
    height: 28px;
    padding: 5px;
  `,
  medium: css`
    font-size: 12px;
    height: 32px;
    padding: 6px;
  `,
  large: css`
    font-size: 14px;
    height: 36px;
    padding: 7px;
  `,
  xlarge: css`
    font-size: 16px;
    height: 44px;
    padding: 8px;
  `,
  xxlarge: css`
    font-size: 18px;
    height: 50px;
    padding: 9px;
  `,
};

export const Button = styled.button<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  span {
    margin: 0 8px;
  }

  ${(props) => css`
    ${colorTemplate[props.color || "main"]};
    ${sizeTemplate[props.size || "medium"]};
  `}
`;
