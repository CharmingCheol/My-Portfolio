import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ModalBody = styled.div`
  .thumbnail-preview {
    width: 100%;
    height: 240px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .thumbnail-input {
    display: none;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  .right-buttons {
    display: flex;
    button {
      margin-left: 8px;
    }
  }
`;
