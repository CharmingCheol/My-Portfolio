import styled from "styled-components";
import media from "styles/media";

export const Main = styled.main`
  width: 100%;
  margin: 40px 0;
  .thumbnail {
    width: 100%;
    margin: 16px 0;
  }
  ${media.laptop("min")} {
    width: 768px;
    margin: 40px auto;
  }
`;
