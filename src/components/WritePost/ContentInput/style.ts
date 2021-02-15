import styled from "styled-components";

export const Layout = styled.div`
  height: 100%;
  margin-bottom: 16px;
  overflow-y: scroll;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    text-align: center;
    width: 20%;
  }
  button {
    color: black;
  }
`;
