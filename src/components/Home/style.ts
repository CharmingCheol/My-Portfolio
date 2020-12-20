import styled, { css } from "styled-components";

const Hexagon = (width: number, isParent: boolean, color: string) => {
  const height = `${width * Math.sqrt(3)}`;
  return css`
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
    .isClicked {
      background-color: var(--color);
      cursor: pointer;
    }
    &.isClicked:before {
      border-right: ${width / 2}px solid var(--color);
      left: -${width / 2}px;
    }
    &.isClicked:after {
      border-left: ${width / 2}px solid var(--color);
      right: -${width / 2}px;
    }
    .selected {
      background-color: var(--color);
      transition: background-color var(--time);
    }
    &.selected:before {
      border-right: ${width / 2}px solid var(--color);
      left: -${width / 2}px;
      transition: border-right var(--time);
    }
    &.selected:after {
      border-left: ${width / 2}px solid var(--color);
      right: -${width / 2}px;
      transition: border-left var(--time);
    }
    ${() => {
      if (isParent) {
        return css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: ${width * 2}px;
        `;
      }
      return css`
        position: absolute;
        z-index: 1;
      `;
    }}
  `;
};

export const Layout = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  .container {
    position: absolute;
    top: -40px;
    left: -40px;
  }
  section {
    position: relative;
  }
  ul {
    display: flex;
  }
  li {
    ${Hexagon(36, true, "transparent")};
  }
  .odd {
    position: absolute;
    top: 31px;
    left: 54px;
  }
  .little-hexagon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    ${Hexagon(32, false, "black")};
    p {
      position: absolute;
      top: 13px;
      font-weight: bold;
      color: white;
      z-index: 1;
      cursor: pointer;
    }
  }
`;
