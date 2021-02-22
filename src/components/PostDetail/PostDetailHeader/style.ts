import styled from "styled-components";

export const Layout = styled.section`
  margin-bottom: 40px;
  h1 {
    margin-bottom: 8px;
  }
  span {
    margin-bottom: 16px;
    display: block;
  }
  .date-wrapper {
    display: flex;
    .created-at {
      margin-right: auto;
    }
    .modify-btn,
    .delete-btn {
      font-weight: bold;
      cursor: pointer;
    }
    .delete-btn {
      margin-left: 8px;
    }
  }
`;
