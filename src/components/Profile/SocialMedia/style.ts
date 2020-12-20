import styled from "styled-components";

export const Layout = styled.ul`
  position: absolute;
  top: 16px;
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  background: #fff;
  z-index: 1;
  @media (max-width: 769px) {
    width: 25%;
    padding: 4px 8px;
  }
  @media (max-width: 576px) {
    left: 16px;
  }
  @media (max-width: 450px) {
    width: 40%;
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: 1px solid white;
  border-radius: 50%;
  background: #4d4d4d;
  cursor: pointer;
  svg {
    cursor: pointer;
    color: white;
  }
  @media (max-width: 576px) {
    width: 32px;
    height: 32px;
  }
`;
