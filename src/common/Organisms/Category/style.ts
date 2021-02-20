import styled from "styled-components";
import { NavLink } from "react-router-dom";
import palette from "@utils/styles/palette";

export const Category = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  padding: 32px 16px 16px 16px;
  transform: translateX(-300px);
  background: ${palette.gray5};
  z-index: 1;
  box-shadow: rgb(0 0 0 / 10%) 1px 4px 16px 0px;
  &.opened {
    transform: translateX(0px);
  }
  .category-open {
    position: absolute;
    right: -24px;
    top: 50%;
    padding: 16px 8px;
    background: ${palette.gray5};
    color: ${palette.blue5};
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 5%) 2px 2px 2px 1px;
  }
  .category-modify {
    position: absolute;
    top: 8px;
    left: 8px;
    color: ${palette.blue5};
    cursor: pointer;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  a {
    width: 100%;
  }
`;

export const CategoryInput = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  .input-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 4px;
    input {
      width: 100%;
      flex: 1;
    }
  }
  .submit-btn {
    margin-left: auto;
  }
`;

export const ModifyMenu = styled.div`
  display: flex;
  align-items: center;
  .icon-wrapper {
    margin-left: auto;
    svg {
      margin-left: 4px;
      cursor: pointer;
    }
  }
`;

export const Link = styled(NavLink)`
  margin-bottom: 8px;
  color: ${palette.blue5};
  font-weight: bold;
`;

export const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  background: rgba(247, 246, 242, 0.5);
  width: 100%;
  height: 100%;
  &.opened {
    display: block;
  }
`;
