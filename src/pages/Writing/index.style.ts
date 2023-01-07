import styled from "styled-components";
import media from "styles/media";

export const Layout = styled.div`
  width: 100%;
  margin: 40px 0;

  ${media.laptop("min")} {
    width: 768px;
    margin: 40px auto;
  }
`;
