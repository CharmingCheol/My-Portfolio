import styled from "styled-components";

interface ButtonWrapperProps {
  powerBtnColor: boolean;
}

export const Layout = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 120px;
  padding: 4px;
  margin: 0 16px 16px 0;
  background: white;
  border: 1px solid #4d4d4d;
  border-radius: 16px;
  @media (max-width: 450px) {
    height: 100px;
    padding: 4px;
  }
`;

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & svg {
    font-size: 24px;
    color: #4d4d4d;
    cursor: pointer;
  }
  & svg:first-child {
    margin-bottom: 16px;
  }
  .power {
    color: ${(props) => (props.powerBtnColor ? "#4d4d4d" : "#8cbd1f")};
    transition: color 2s;
  }
  @media (max-width: 576px) {
    svg {
      font-size: 20px;
    }
  }
`;

export const VolumeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 100%;
`;

export const VolumeGraph = styled.div`
  width: 25%;
  height: 100%;
  border-radius: 16px;
  border: 2px solid #4d4d4d;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 1px;
  background: #e8e8e8;
`;

export const DragButton = styled.div`
  position: absolute;
  width: 80%;
  height: 15%;
  border-radius: 16px;
  border: 2px solid #4d4d4d;
  background: #c5c3c7;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 1px;
  z-index: 1;
  cursor: pointer;
`;
