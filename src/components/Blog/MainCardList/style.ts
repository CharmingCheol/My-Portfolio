import styled from "styled-components";
import media from "@utils/styles/media";

export const Layout = styled.section`
  margin: 16px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const SkeletonItem = styled.div`
  width: 33%;
  padding: 16px;
  height: 400px;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #ebebeb;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  }
  .image {
    height: 40%;
    background: #dbdbdb;
  }
  .content-wrapper {
    height: 60%;
    padding: 12px;
  }
  .content {
    width: 100%;
    height: 32px;
    margin-bottom: 16px;
    background: #dbdbdb;
  }
  ${media.tablet} {
    width: 50%;
  }
  ${media.mobile} {
    width: 100%;
  }
`;
