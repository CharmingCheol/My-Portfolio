import styled from "styled-components";
import media from "@utils/styles/media";
import palette from "@utils/styles/palette";

export const Layout = styled.article`
  display: flex;
  justify-content: space-between;
`;

export const CategoryInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 160px;
  input {
    flex: 1;
    width: 100%;
  }
  .category-spread-btn {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 0;
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

export const ButtonWrapper = styled.div`
  display: flex;
  button {
    margin-left: 4px;
  }
  ${media.mobile} {
    button {
      padding: 4px 8px;
      font-size: 0.5rem;
    }
  }
`;
