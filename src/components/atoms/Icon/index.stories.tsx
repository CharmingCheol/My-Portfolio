import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { AiFillGithub } from "react-icons/ai";
import styled from "styled-components";
import { PaletteType } from "styles/palette";
import { IconSize } from "./type";
import Icon, { Props } from "./index";

export default {
  title: "atoms/Icon",
  component: Icon,
} as Meta;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 8px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

// available handle controls
const DefaultIconTemplate: Story<Props> = (props) => {
  const iconSize: IconSize[] = ["small", "medium", "large", "xlarge", "xxlarge"];
  return (
    <Wrapper>
      {iconSize.map((size) => (
        <Icon key={size} iconSize={size} {...props} />
      ))}
    </Wrapper>
  );
};
export const DefaultIcon = DefaultIconTemplate.bind({});
DefaultIcon.args = {
  icon: AiFillGithub,
};

// icon size
const IconSizeTemplate: Story<Props> = () => {
  const iconSize: IconSize[] = ["small", "medium", "large", "xlarge", "xxlarge"];
  return (
    <Wrapper>
      {iconSize.map((size) => (
        <div className="wrapper">
          <Icon key={size} icon={AiFillGithub} iconSize={size} />
          <span>{size}</span>
        </div>
      ))}
    </Wrapper>
  );
};
export const IconSizeCase = IconSizeTemplate.bind({});

// icon color
const IconColorTemplate: Story<Props> = () => {
  const palette: PaletteType[] = ["black_20", "green_40", "red_40", "gray_40", "navy_40"];
  return (
    <Wrapper>
      {palette.map((color) => (
        <Icon key={color} icon={AiFillGithub} iconColor={color} />
      ))}
    </Wrapper>
  );
};
export const IconColorCase = IconColorTemplate.bind({});

// border icon
const BorderIconTemplate: Story<Props> = () => {
  const palette: PaletteType[] = ["black_20", "green_40", "red_40", "gray_40", "navy_40"];
  return (
    <Wrapper>
      {palette.map((color) => (
        <Icon key={color} icon={AiFillGithub} borderColor={color} />
      ))}
    </Wrapper>
  );
};
export const BorderIconCase = BorderIconTemplate.bind({});

// background icon
const BackgroundIconTemplate: Story<Props> = () => {
  const palette: PaletteType[] = ["black_20", "green_40", "red_40", "gray_40", "navy_40"];
  return (
    <Wrapper>
      {palette.map((color) => (
        <Icon key={color} icon={AiFillGithub} backgroundColor={color} />
      ))}
    </Wrapper>
  );
};
export const BackgroundIconCase = BackgroundIconTemplate.bind({});

// onClick을 props로 줬을 때
const IconClickTemplate: Story<Props> = () => {
  const [toggle, setToggle] = useState(false);
  const clickIcon = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <p>
        onClick props를 내리고 아이콘에 hover 시, 커서가 pointer로 변경됩니다. 그리고 아이콘을 클릭 할 경우 텍스트가
        변경됩니다
      </p>
      <Icon icon={AiFillGithub} onClick={clickIcon} />
      <span>{toggle ? "true" : "false"}</span>
    </>
  );
};
export const IconClickCase = IconClickTemplate.bind({});

// 아이콘 클릭 시 disabled
const IconClickDisabledTemplate: Story<Props> = () => {
  const [disabled, setDisabled] = useState(false);
  const clickIcon = () => {
    setDisabled(true);
  };
  return (
    <>
      <p>
        아이콘 클릭 시 disabled를 적용시킵니다. disabled color를 변경하고 싶다면, props로 disabledColor를 전달합니다.
      </p>
      <Icon icon={AiFillGithub} onClick={clickIcon} disabled={disabled} />
    </>
  );
};
export const IconClickDisabledCase = IconClickDisabledTemplate.bind({});
