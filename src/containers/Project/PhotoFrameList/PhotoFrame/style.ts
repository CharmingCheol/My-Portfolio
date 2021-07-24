import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;

  &.first-art {
    left: -15%;
    top: 30%;
    transform: translateZ(-5px) rotateY(75deg);
  }

  &.second-art {
    left: 5%;
    top: 30%;
    transform: translateZ(-5px) rotateY(75deg);
  }

  &.third-art {
    left: 20%;
    top: 30%;
    transform: translateZ(-5px) rotateY(105deg);
  }

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

  @media (max-width: 992px) {
    &.first-art {
      left: -20%;
      top: 30%;
    }
    &.second-art {
      left: 0%;
      top: 30%;
    }
    &.third-art {
      left: 20%;
      top: 30%;
    }
  }

  @media (max-width: 769px) {
    &.second-art {
      left: -20%;
      top: 55%;
    }
  }

  @media screen and (max-width: 768px) and (orientation: landscape) {
    &.second-art {
      left: 0vw;
      top: 30%;
    }
  }
`;
