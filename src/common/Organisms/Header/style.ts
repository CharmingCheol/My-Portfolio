import styled from "styled-components";
import media from "@utils/styles/media";
import palette from "@utils/styles/palette";

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 40px;
  padding: 4px 0;
  background: ${palette.blue5};
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1728px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  svg {
    cursor: pointer;
  }
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

export const SettingMenu = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: flex-end;
  padding: 8px 16px;
  background: ${palette.blue5};
  a {
    padding: 8px;
    color: white;
  }
`;
