import styled from "styled-components";

export const Layout = styled.li`
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  padding: 16px 0;
  a {
    display: flex;
    width: 100%;
  }
  p {
    flex: 1;
    margin-right: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
