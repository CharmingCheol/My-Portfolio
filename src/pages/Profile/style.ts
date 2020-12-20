import styled from "styled-components";
import { BackgroundValue } from "./type";

interface Background {
  background: BackgroundValue;
}

export const Layout = styled.div<Background>`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.background};
  transition: background-color 2s;
  @media (max-width: 769px) {
    flex-direction: column-reverse;
  }
`;
