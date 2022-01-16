import styled, { css } from "styled-components";
import media from "styles/media";

interface Params {
  isCenterLayout: boolean;
}

export const Main = styled.main<Params>`
  ${(params) => {
    if (params.isCenterLayout)
      return css`
        width: 100%;
        min-height: calc(100vh - 106px);
        padding-top: 66px;
        padding-bottom: 40px;
        ${media.laptop("min")} {
          width: 721px;
          margin-right: auto;
          margin-left: auto;
        }
        ${media.xlarge("min")} {
          width: 1200px;
          margin-right: auto;
          margin-left: auto;
        }
      `;
  }}
`;
