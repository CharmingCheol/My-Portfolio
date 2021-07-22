import styled from "styled-components";

export const Layout = styled.div`
  transform-style: preserve-3d;
  .wall {
    position: absolute;
    top: 0;
    left: 0;
    width: 1000vw;
    height: 100vh;
    background: #d1cfc9;
  }
  .shadow {
    top: 10px;
    background: rgba(48, 48, 48, 0.1);
    z-index: -1;
  }
  .wall-left {
    transform: rotateY(75deg) translateZ(-500vw);
  }
  .wall-left-shadow {
    transform: rotateY(75deg) translateZ(-499vw);
  }
  .wall-right {
    transform: rotateY(105deg) translateZ(-375vw);
  }
  .wall-right-shadow {
    transform: rotateY(105deg) translateZ(-375vw);
  }
`;
