import styled, { keyframes } from "styled-components";

const infiniteRotation = keyframes`
    0% {
        transform:rotate(0deg);
    }
    50% {
        transform:rotate(180deg);
    }
    100% {
        transform:rotate(359deg);
    }
`;

export const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 55%;
  height: 100%;
  padding: 24px 24px 24px 40px;
  background: white;
  border-radius: 24px;
  transform: translateX(-24px);
  background: #e8e8e8;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 16px 0px;
  @media (max-width: 769px) {
    width: 100%;
    height: 50%;
    transform: translateX(0px);
    border-radius: 16px 16px 0 0;
  }
`;

export const RecordPlayerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const VinyRecordWrapper = styled.div`
  position: relative;
  width: 65%;
  padding-bottom: 70%;
  vertical-align: middle;
  overflow: hidden;
  & svg {
    position: absolute;
    top: 8px;
    left: 0;
    animation: ${infiniteRotation} 8s infinite linear;
  }
  @media (max-width: 769px) {
    width: 40vh;
    padding-bottom: 44vh;
  }
  @media (max-width: 576px) {
    width: 30vh;
    padding-bottom: 35vh;
  }
  @media (max-width: 450px) {
    width: 50%;
    padding-bottom: 52%;
  }
`;

export const StickWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 18%;
  padding-bottom: 70vh;
  overflow: hidden;
  transform-origin: 60% 95%;
  & svg {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media (max-width: 769px) {
    width: 12vh;
    padding-bottom: 40vh;
    left: 22vw;
  }
  @media (max-width: 576px) {
    width: 9vh;
    padding-bottom: 34vh;
    left: 12%;
  }
  @media (max-width: 450px) {
    width: 14%;
    padding-bottom: 28vh;
    left: 10%;
  }
  @media (max-height: 450px) {
    left: 27vw;
  }
`;
