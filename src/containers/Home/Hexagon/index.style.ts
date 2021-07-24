import styled, { css } from "styled-components";

interface Params {
  color: string;
  isParentHexagon: boolean;
  width: number;
}

const HexagonStyles = (params: Params) => {
  const { color, isParentHexagon, width } = params;
  const height = `${width * Math.sqrt(3)}`;
  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
    background-color: ${color};
    &:before,
    &:after {
      content: "";
      position: relative;
      float: left;
      border-top: ${parseInt(height, 10) / 2}px solid transparent;
      border-bottom: ${parseInt(height, 10) / 2}px solid transparent;
    }
    &:before {
      border-right: ${width / 2}px solid ${color};
      left: -${width / 2}px;
    }
    &:after {
      border-left: ${width / 2}px solid ${color};
      right: -${width / 2}px;
    }
    ${() => {
      if (isParentHexagon) {
        return css`
          position: relative;
          margin-right: ${width * 2}px;
        `;
      }
      return css`
        position: absolute;
      `;
    }}
  `;
};

export const Hexagon = styled.li`
  z-index: 1;
  ${HexagonStyles({ width: 36, isParentHexagon: true, color: "transparent" })};
  div {
    ${HexagonStyles({ width: 32, isParentHexagon: false, color: "#666666" })};
  }
  div.picked {
    background-color: var(--color);
    transition: background-color var(--time);
    &:before {
      border-right: ${32 / 2}px solid var(--color);
      transition: border-right var(--time);
    }
    &:after {
      border-left: ${32 / 2}px solid var(--color);
      transition: border-left var(--time);
    }
  }
  span {
    position: absolute;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    z-index: 2;
  }
`;

export const TransparentWall = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  transform: translate3d(0px, -126px, 0px);
  z-index: 3;
`;
