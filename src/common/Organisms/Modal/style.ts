import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(219, 219, 219, 0.5);
  &.active {
    display: flex;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 50%;
  padding: 16px;
  border-radius: 16px;
  background: white;
`;
