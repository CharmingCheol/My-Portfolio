import styled from "styled-components";
import palette from "@utils/styles/palette";

export const Layout = styled.article`
  display: flex;
  justify-content: space-between;
`;

export const CategoryInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 240px;
  input {
    flex: 1;
    width: 100%;
  }
  .category-spread-btn {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    margin-right: 4px;
  }
`;

export const CategoryList = styled.ul<{ categoryCount: number }>`
  position: absolute;
  height: 140px;
  top: -160px;
  left: 0;
  display: none;
  width: 100%;
  padding: 8px;
  background: ${palette.gray2};
  z-index: 2;
  overflow-y: scroll;
  box-shadow: rgb(0 0 0 / 10%) 1px 4px 16px 0px;
  &.opened {
    display: block;
  }
  li {
    height: 20px;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;
