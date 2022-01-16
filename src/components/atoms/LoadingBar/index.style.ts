import styled, { keyframes } from "styled-components";

const OFFSET = 187;

const rotate = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke: #4285f4;
    stroke-dashoffset: ${OFFSET};
    transform: rotate(0deg);
  }
  50% {
    stroke: #f7c223;
    stroke-dashoffset: ${OFFSET / 4};
    transform: rotate(220deg);
  }
  100% {
    stroke: #4285f4;
    stroke-dashoffset: ${OFFSET};
    transform: rotate(440deg);
  }
`;

export const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  svg {
    animation: ${rotate} 1.4s linear infinite;
  }
  circle {
    stroke-dasharray: ${OFFSET};
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1.4s ease-in-out infinite;
  }
`;
