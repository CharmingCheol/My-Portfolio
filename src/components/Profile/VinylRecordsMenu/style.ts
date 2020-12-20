import styled, { css } from "styled-components";

interface ListProps {
  printMenu: boolean;
}

interface CoverProps {
  color: string;
}

export const List = styled.ul<ListProps>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  z-index: 2;
  /* transition: transform 1s; */
  ${(props) => {
    if (props.printMenu) {
      return css`
        transform: translateY(0px);
      `;
    }
    return css`
      transform: translateY(-120px);
    `;
  }}
  @media (max-width: 769px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 150px;
    flex-direction: row;
  }
  @media (max-width: 576px) {
    height: 125px;
  }
  @media (max-width: 450px) {
    height: 100px;
  }
  @media (min-width: 770px) {
    ${(props) => {
      if (props.printMenu) {
        return css`
          transform: translateX(0px);
        `;
      }
      return css`
        transform: translateX(100px);
      `;
    }}
  }
`;

export const ListItem = styled.li`
  position: relative;
  width: 100%;
  height: 33.3333%;
  padding-bottom: 100%;
  vertical-align: middle;
  transform: translateY(-100px);
  /* transition: transform 1s; */
  cursor: pointer;
  & svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 1.5s;
  }
  &:hover {
    transform: translateY(0px);
    svg {
      transform: translateY(2vh);
    }
  }
  @media (max-width: 769px) {
    width: 33.3333%;
    height: 100%;
    padding-bottom: 0%;
    svg {
      transform: translateY(-100px);
    }
  }
  @media (max-width: 450px) {
    transform: translateY(-80px);
  }
  @media (min-width: 770px) {
    transform: translateX(120px);
    &:hover {
      transform: translateX(0px);
      svg {
        transform: translateX(-8vw);
      }
    }
  }
`;

export const Cover = styled.div<CoverProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${(props) => props.color};
`;
