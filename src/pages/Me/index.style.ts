import styled from "styled-components";
import media from "@styles/media";
import fontSize from "@styles/fontSize";

export const FirstArticle = styled.article`
  width: 100vw;
  .left-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 85vh;
    padding: 0 8%;
    background-color: #f6f6f6;
    .detail {
      margin: 8px 0;
      text-decoration: underline;
    }
    span {
      display: block;
    }
    p {
      font-size: ${fontSize.h3}px;
    }
    div {
      display: flex;
      a {
        margin-right: 16px;
      }
    }
    .main-title {
      font-size: ${fontSize.h1}px;
      font-weight: bold;
    }
  }
  .right-section {
    display: flex;
    align-items: center;
    height: 60vh;
    background-color: #d4d4ce;
    img {
      width: 200px;
      height: 200px;
    }
  }
  ${media.tablet("max")} {
    .right-section {
      justify-content: center;
    }
  }
  ${media.tablet("min")} {
    display: flex;
    height: 80vh;
    .left-section {
      width: 60vw;
      height: 100%;
    }
    .right-section {
      width: 40vw;
      height: 100%;
      img {
        transform: translate(-40px, 0px);
      }
    }
  }
  ${media.desktop("min")} {
    .right-section {
      img {
        transform: translate(-40px, 0px) scale(1.25);
      }
    }
  }
  ${media.xlarge("min")} {
    .right-section {
      img {
        transform: translate(-40px, 0px) scale(1.5);
      }
    }
  }
`;

export const SecondArticle = styled.article`
  min-height: 100vh;
  padding: 180px 8%;
  background-color: #f6f6f6;
  section {
    margin-bottom: 40px;
  }
  h2,
  div {
    margin-bottom: 16px;
  }
`;

export const ThirdArticle = styled.article`
  min-height: 100vh;
  padding: 180px 8%;
  background-color: #d4d4ce;
  h2 {
    margin-bottom: 16px;
    text-align: center;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 240px;
      padding: 16px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
  }
  ${media.tablet("min")} {
    section {
      figure {
        width: 50%;
      }
    }
  }
  ${media.desktop("min")} {
    section {
      figure {
        width: 33%;
      }
    }
  }
`;
