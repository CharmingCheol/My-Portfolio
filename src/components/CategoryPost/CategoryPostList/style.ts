import styled from "styled-components";

export const Layout = styled.section`
  margin-bottom: 32px;
  h1 {
    margin-bottom: 24px;
  }
`;

export const Skeleton = styled.div`
  display: flex;
  padding: 16px 0;
  .title,
  .date {
    height: 32px;
    background: #ebebeb;
  }
  .title {
    flex: 1;
    margin-right: 16px;
  }
  .date {
    width: 80px;
  }
`;
