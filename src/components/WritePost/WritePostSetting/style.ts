import styled from "styled-components";
import palette from "@utils/styles/palette";
import media from "@utils/styles/media";

export const Layout = styled.article`
  .gear-icon {
    position: fixed;
    right: 24px;
    bottom: 24px;
    font-size: 1.5rem;
    color: ${palette.blue5};
    cursor: pointer;
  }
  ${media.custom(897)} {
    .gear-icon {
      bottom: 64px;
      right: 16px;
    }
  }
`;

export const SettingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: ${palette.gray1};
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 32px;
  overflow-y: scroll;
  background: ${palette.gray5};
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

export const ThumbnailWrapper = styled.div`
  display: flex;
  height: 280px;
  margin-bottom: 16px;
  .thumbnail {
    width: 75%;
  }
  .image-list {
    width: 25%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    img {
      height: 33%;
      cursor: pointer;
    }
  }
`;

export const BottomButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 8px;
  }
  .back-btn {
    background: ${palette.green5};
  }
  .save-btn {
    background: ${palette.blue5};
  }
`;
