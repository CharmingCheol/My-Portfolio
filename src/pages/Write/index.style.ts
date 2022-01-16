import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const TitleWrapper = styled.div`
  padding: 8px;
  input {
    width: 100%;
    background-color: transparent;
  }
`;

export const Footer = styled.footer`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  .right-buttons {
    display: flex;
    button {
      margin-left: 8px;
    }
  }
`;
