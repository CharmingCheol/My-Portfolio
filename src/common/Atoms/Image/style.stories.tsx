import React from "react";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react/types-6-0";
import Image, { ImageProps } from "./index";

export default {
  title: "atoms/Image",
  component: Image,
  args: {
    alt: "test image",
    lazy: false,
    src:
      "https://images.unsplash.com/photo-1612738802443-c1291951687b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  },
} as Meta;

const Template: Story<ImageProps> = (args) => {
  return <Image {...args} />;
};

const ImageList: Story<ImageProps> = (args) => {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <ImageWrapper key={index.toString()}>
            <Image {...args} />
          </ImageWrapper>
        ))}
    </>
  );
};

// 기본 Image
export const DefaultImage = Template.bind({});

// lazy loading이 적용되지 않은 경우
export const NotLazyLoadingImage = ImageList.bind({});

// lazy loading이 적용되어 있는 경우
export const LazyLoadingImage = ImageList.bind({});
LazyLoadingImage.args = {
  lazy: true,
};

// 이미지 리스트 Wrapper
const ImageWrapper = styled.div`
  width: 100vw;
  height: 80vh;
`;
