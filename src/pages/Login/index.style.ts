import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 106px);
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 30%;
    h2 {
      text-align: center;
      margin-bottom: 24px;
    }
    input {
      margin-bottom: 16px;
      border: 1px solid black;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
`;
