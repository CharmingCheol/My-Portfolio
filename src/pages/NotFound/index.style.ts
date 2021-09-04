import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  .buttons {
    display: flex;
    button:first-child {
      margin-right: 8px;
    }
  }
`;
