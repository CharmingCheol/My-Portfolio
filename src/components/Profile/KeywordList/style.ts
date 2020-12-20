import styled, { css } from "styled-components";
import { BackgroundValue } from "@pages/Profile/type";

interface TextHidRectProps {
  position: "top" | "bottom";
  background: BackgroundValue;
  visibled: boolean;
}

interface TitleWrapperProps {
  displayed: string;
}

interface TextListWrapperProps {
  visibled: boolean;
  textRatio: number;
}

export const TextHidRect = styled.div<TextHidRectProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 30vh;
  background-color: ${(props) => props.background};
  z-index: 1;
  transition: background-color 2s;
  ${(props) => {
    if (props.position === "top") {
      if (props.visibled) {
        return css`
          top: 0;
          transform: translateY(0px);
        `;
      }
      return css`
        transform: translateY(-1600px);
        top: 0;
      `;
    }
    if (props.visibled) {
      return css`
        bottom: 0;
        transform: translateY(0px);
      `;
    }
    return css`
      bottom: 0;
      transform: translateY(1600px);
    `;
  }}
  @media (max-width:769px) {
    width: 100%;
    height: 15vh;
    padding-top: 16px;
    ${(props) => {
      if (props.position === "bottom") {
        return css`
          top: 35%;
        `;
      }
      return css``;
    }}
  }
  @media (max-width: 576px) {
    h1,
    h2 {
      font-size: 20px;
    }
  }
`;

export const TitleWrapper = styled.div<TitleWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 1s;
  ${(props) => {
    if (props.displayed) {
      return css`
        opacity: 1;
      `;
    }
    return css`
      opacity: 0;
    `;
  }}
  h1, h2 {
    color: white;
    font-weight: 400;
  }
  .progress-bar {
    position: relative;
    width: 70%;
    height: 16px;
    margin-top: 8px;
    background: black;
  }
  .progress-bar .progress-bar-gauge {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: white;
  }
`;

export const TextListWrapper = styled.div<TextListWrapperProps>`
  display: ${(props) => (props.visibled ? "flex" : "none")};
  visibility: ${(props) => (props.visibled ? "visible" : "hidden")};
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: visibility 2s;
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    padding: 50vh 0;
    font-size: ${(props) => `${20 * props.textRatio}px`};
    color: white;
    text-align: center;
    word-break: keep-all;
  }
  @media (max-width: 992px) {
    p {
      font-size: ${(props) => `${18 * props.textRatio}px`};
    }
  }
  @media (max-width: 769px) {
    p {
      font-size: ${(props) => `${16 * props.textRatio}px`};
    }
  }
  @media (max-width: 576px) {
    p {
      font-size: ${(props) => `${14 * props.textRatio}px`};
    }
  }
`;
