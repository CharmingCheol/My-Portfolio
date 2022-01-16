import styled from "styled-components";
import media from "styles/media";

export const ContentCard = styled.li`
  width: 100%;
  padding: 8px;
  div {
    padding: 16px;
    border-radius: 16px;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 8px 0px;
  }
  h4 {
    width: 100%;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 84px;
    margin-bottom: 8px;
    overflow: hidden;
    word-break: break-all;
  }
  ${media.xlarge("min")} {
    width: 30%;
    flex: 0 0 30%;
  }
  ${media.laptop("min")} {
    width: 50%;
    flex: 0 0 50%;
  }
`;
