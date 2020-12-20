import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  left: -20%;
  top: 30%;
  transform-style: preserve-3d;
  transform: translateZ(-5px) rotateY(75deg);
  .art {
    position: absolute;
  }
  .art-front {
    width: 300px;
    height: 120px;
    background: #8cab5f;
    transform: rotateY(0deg) translateZ(5px);
    overflow: hidden;
  }
  .art-back {
    width: 300px;
    height: 120px;
    background: #0b0b05;
    transform: rotateY(180deg) translateZ(5px);
  }
  .art-left {
    left: 145px;
    width: 10px;
    height: 120px;
    background: #0b0b05;
    transform: rotateY(-90deg) translateZ(150px);
  }
  .art-top {
    top: 55px;
    width: 300px;
    height: 10px;
    background: #0b0b05;
    transform: rotateX(90deg) translateZ(60px);
  }
  .art-bottom {
    top: 55px;
    width: 300px;
    height: 10px;
    background: #0b0b05;
    transform: rotateX(-90deg) translateZ(60px);
  }
  canvas {
    background-color: blue;
  }
`;
