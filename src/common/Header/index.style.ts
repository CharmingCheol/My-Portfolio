import styled from "styled-components";
import { Link } from "react-router-dom";
import { palette } from "styles/palette";
import media from "styles/media";

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 66px;
  padding: 16px;
  border-bottom: 1px solid ${palette.gray_60};
  background: ${palette.white_20};
  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }
  ${media.laptop("min")} {
    .menu-icon {
      display: none;
    }
  }
`;

export const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 20px;
    height: 20px;
  }
  ${media.laptop("min")} {
    & {
      position: static;
      transform: translate(0, 0);
    }
  }
`;

export const List = styled.ul`
  position: absolute;
  top: 50px;
  left: -16px;
  display: none;
  width: 100vw;
  box-shadow: rgb(100 100 111 / 10%) 0px 7px 16px 0px;
  li {
    padding: 16px;
    text-align: center;
    font-weight: bold;
  }
  &.showed {
    display: block;
  }
  ${media.laptop("min")} {
    & {
      position: static;
      display: flex;
      width: auto;
      margin-left: 24px;
      box-shadow: none;
    }
  }
`;
