import styled, { css, keyframes } from "styled-components";

const rotation = (number: number) => {
  return keyframes`
    0% {
      transform: translateZ(-${number}px) rotate3d(0,0,0);
    }
    100% {
      transform: translateZ(-${number * 2}px) rotate3d(1,0,1,360deg);
    }
  `;
};

const cubeMediaQuery = (number: number) => {
  return css`
    width: ${number}px;
    height: ${number}px;
    transform: translateZ(-${number / 2}px);
    .front {
      transform: rotateY(0deg) translateZ(${number / 2}px);
    }
    .back {
      transform: rotateY(180deg) translateZ(${number / 2}px);
    }
    .top {
      transform: rotateX(90deg) translateZ(${number / 2}px);
    }
    .bottom {
      transform: rotateX(-90deg) translateZ(${number / 2}px);
    }
    .left {
      transform: rotateY(-90deg) translateZ(${number / 2}px);
    }
    .right {
      transform: rotateY(90deg) translateZ(${number / 2}px);
    }
  `;
};

export const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(21, 31, 48, 0.8);
  perspective: 600px;
`;

export const Cube = styled.div`
  position: relative;
  ${cubeMediaQuery(200)}
  transform-style: preserve-3d;
  animation: ${rotation(300)} 10s infinite alternate;
  canvas {
    background: #151f30;
  }
  .figure {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 550px) {
    ${cubeMediaQuery(200)}
    animation: ${rotation(200)} 10s infinite alternate;
  }

  @media (max-height: 450px) {
    ${cubeMediaQuery(150)}
    animation: ${rotation(150)} 10s infinite alternate;
  }
`;

export const Footer = styled.footer`
  margin-top: 96px;
  text-align: center;
  .button-wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
  }
  h1 {
    color: #dedede;
  }
  button {
    width: 160px;
    padding: 16px;
    background: none;
    border: 2px solid #c94a46;
    color: #c94a46;
    font-weight: bold;
    cursor: pointer;
  }
  button:first-child {
    margin-right: 32px;
  }
  @media (max-width: 450px) {
    button {
      width: 100px;
    }
    button:first-child {
      margin-right: 16px;
    }
  }

  @media screen and (max-height: 450px) and (orientation: landscape) {
    margin-top: 64px;
    .button-wrapper {
      margin-top: 16px;
    }
    button {
      padding: 8px;
    }
  }
`;
