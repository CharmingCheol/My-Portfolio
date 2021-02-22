import styled from "styled-components";
import palette from "@utils/styles/palette";

export const Layout = styled.section`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;

export const PageNumberList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 8px;
`;

export const PageNumberItem = styled.li`
  width: 40px;
  text-align: center;
  cursor: pointer;
  &.active {
    color: ${palette.red5};
    font-weight: bold;
    cursor: default;
  }
`;
