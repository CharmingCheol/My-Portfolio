import styled, { keyframes } from "styled-components";

const moveToY = (number: number) => {
  return keyframes`
    0% {
      transform: translateY(0vw);
    }
    100% {
      transform: translateY(${number}px);
    }
`;
};

const moveToX = (number: number) => {
  return keyframes`
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(${number}px);
    }
  `;
};

const rotateY = keyframes`
  0% {
    transform:scale(1) rotateY(0deg);
  }
  50% {
    transform:scale(0.6) rotateY(90deg);
  }
  100% {
    transform:scale(1) rotateY(180deg);
  }
`;

export const Layout = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  transform-style: preserve-3d;
  animation: ${rotateY} 1.5s 4s forwards;
  @media (max-width: 576px) {
    width: 400px;
    height: 600px;
  }
  @media (max-width: 450px) {
    width: 320px;
    height: 480px;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  .line-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .line {
    position: absolute;
    left: 200px;
    width: 200px;
    height: 200px;
  }
  .second-line {
    animation: ${moveToY(200)} 1s 0.6s forwards;
  }
  @media (max-width: 576px) {
    .line {
      top: 200px;
      left: 0px;
    }
    .second-line {
      animation: ${moveToX(200)} 1s 0.6s forwards;
    }
  }
  @media (max-width: 450px) {
    .line {
      top: 160px;
      left: 0px;
    }
    .second-line {
      animation: ${moveToX(160)} 1s 0.6s forwards;
    }
  }
`;

export const Card = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  canvas {
    background: #151f30;
  }
  &.first-line-left {
    animation: ${moveToX(-200)} 1s 1.6s forwards;
  }
  &.first-line-right {
    animation: ${moveToX(200)} 1s 2.6s forwards;
  }
  &.second-line-left {
    animation: ${moveToX(-200)} 1s 2.6s forwards;
  }
  &.second-line-right {
    animation: ${moveToX(200)} 1s 1.6s forwards;
  }

  @media (max-width: 576px) {
    &.first-line-left {
      animation: ${moveToY(-200)} 1s 1.6s forwards;
    }
    &.first-line-right {
      animation: ${moveToY(200)} 1s 2.6s forwards;
    }
    &.second-line-left {
      animation: ${moveToY(-200)} 1s 2.6s forwards;
    }
    &.second-line-right {
      animation: ${moveToY(200)} 1s 1.6s forwards;
    }
  }
  @media (max-width: 450px) {
    width: 160px;
    height: 160px;
    &.first-line-left {
      animation: ${moveToY(-160)} 1s 1.6s forwards;
    }
    &.first-line-right {
      animation: ${moveToY(160)} 1s 2.6s forwards;
    }
    &.second-line-left {
      animation: ${moveToY(-160)} 1s 2.6s forwards;
    }
    &.second-line-right {
      animation: ${moveToY(160)} 1s 1.6s forwards;
    }
  }
`;

export const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px 16px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: #151f30;
  color: white;
  nav {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    justify-content: space-between;
    width: 80px;
    svg {
      font-size: 24px;
      cursor: pointer;
    }
  }
  header,
  section {
    margin-bottom: 24px;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  footer {
    position: absolute;
    bottom: 16px;
    width: calc(100% - 32px);
    height: 120px;
  }
  @media (max-width: 450px) {
    header {
      margin-top: 24px;
    }
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.2rem;
    }
  }
`;
