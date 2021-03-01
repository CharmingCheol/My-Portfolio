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
    .modify-btn {
      font-weight: bold;
      cursor: pointer;
    }
  }
  .delete-button-wrapper {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 8px;
    }
  }
`;

export const DeleteText = styled.span`
  margin-left: 8px;
  font-weight: bold;
  cursor: pointer;
`;
