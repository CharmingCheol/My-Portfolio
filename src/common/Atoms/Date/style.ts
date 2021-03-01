import styled, { css } from "styled-components";

interface DateParams {
  bold: boolean;
  fontColor: string;
  fontSize: number;
}

export const Date = styled.span<DateParams>`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => `${props.fontSize}rem`};
  ${(props) => {
    if (props.bold) {
      return css`
        font-weight: bold;
      `;
    }
  }};
`;
