import styled from "styled-components";

export const ImageCard = styled.li`
  width: 33%;
  padding: 16px;
  height: 400px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
`;

export const ImageWrapper = styled.div`
  height: 40%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  padding: 12px;
  background: white;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.4rem;
  }
  ul {
    margin: 8px 0;
  }
  p {
    height: 60%;
    margin-top: 16px;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;