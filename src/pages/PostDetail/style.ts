import styled from "styled-components";
import media from "@utils/styles/media";

export const Layout = styled.main`
  width: 1728px;
  min-height: 100vh;
  padding-top: 64px;
  margin: 0 auto;
  ${media.xxlarge} {
    width: 1376px;
  }
  ${media.xlarge} {
    width: 900px;
  }
  ${media.large} {
    width: calc(100% - 2rem);
  }
`;

export const Skeleton = styled.div`
  height: 100%;
  .header {
    height: 100px;
    margin-bottom: 40px;
    .title {
      height: 32px;
      margin-bottom: 8px;
      background: #ebebeb;
    }
    .date {
      height: 21px;
      margin-bottom: 16px;
      background: #ebebeb;
    }
    .hashtag-list {
      display: flex;
      .hashtag {
        width: 54px;
        height: 24px;
        margin-right: 8px;
        background: #ebebeb;
      }
    }
  }
  .content-wrapper {
    .content {
      width: 100%;
      height: 40px;
      margin-bottom: 16px;
      background: #ebebeb;
    }
  }
`;
