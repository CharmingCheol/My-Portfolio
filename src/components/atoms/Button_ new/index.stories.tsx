import React, { useState } from "react";
import { Link, MemoryRouter } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { Meta, Story } from "@storybook/react";

import Button, { Props } from "./index";

export default {
  title: "atoms/Button_new",
  component: Button,
} as Meta;

// 텍스트만 있는 버튼
const TextButtonTemplate: Story<Props> = () => {
  return (
    <>
      <div>Button 컴포넌트 선언 후에 태그 내부에다가 텍스트를 추가합니다.</div>
      <Button>text button</Button>
    </>
  );
};
export const TextButton = TextButtonTemplate.bind({});

// 아이콘과 조합 된 버튼
const IconButtonTemplate: Story<Props> = () => {
  return (
    <>
      <div>아이콘을 추가하고 싶은 경우 태그 내부에다가 추가합니다.</div>
      <Button>
        <AiFillGithub />
      </Button>
      <Button>
        <AiFillGithub />
        <span>좌측에 아이콘 추가</span>
      </Button>
      <Button>
        <span>우측에 아이콘 추가</span>
        <AiFillGithub />
      </Button>
    </>
  );
};
export const IconButton = IconButtonTemplate.bind({});

// 링크 버튼
const LinkButtonTempalte: Story<Props> = () => {
  return (
    <MemoryRouter>
      <div>페이지 이동 버튼을 추가하고 싶은 경우, 태그 내부에다가 Link 컴포넌트를 추가합니다.</div>
      <div>외부 페이지로 이동하는 버튼인 경우, 태그 내부에다가 a태그를 추가합니다.</div>
      <Button>
        <Link to="/">내부 링크 버튼</Link>
      </Button>
      <Button>
        <a href="https://www.naver.com/">외부 링크 버튼</a>
      </Button>
    </MemoryRouter>
  );
};
export const LinkButton = LinkButtonTempalte.bind({});

// 사이즈
const ButtonSizeTemplate: Story<Props> = () => {
  return (
    <>
      <div>버튼 사이즈를 변경하고 싶은 경우, buttonSize props에다가 값을 추가하여 전달합니다.</div>
      <Button buttonSize="small">small</Button>
      <Button buttonSize="medium">medium</Button>
      <Button buttonSize="large">large</Button>
      <Button buttonSize="xlarge">xlarge</Button>
      <Button buttonSize="xxlarge">xxlarge</Button>
    </>
  );
};
export const ButtonSize = ButtonSizeTemplate.bind({});

// 색상
const ButtonColorTemplate: Story<Props> = () => {
  return (
    <>
      <div>버튼 색상을 변경하고 싶은 경우, buttonSize props에다가 값을 추가하여 전달합니다.</div>
      <Button buttonColor="main">main</Button>
      <Button buttonColor="main_away">main_away</Button>
      <Button buttonColor="sub1">sub1</Button>
      <Button buttonColor="sub1_away">sub1_away</Button>
      <Button buttonColor="sub2">sub2</Button>
      <Button buttonColor="sub2_away">sub2_away</Button>
    </>
  );
};
export const ButtonColor = ButtonColorTemplate.bind({});

// disabled
const DisabledButtonTemplate: Story<Props> = () => {
  const [disabled, setDisabled] = useState(false);
  const onClick = () => setDisabled((prev) => !prev);

  return (
    <>
      <div>disabled가 true인 경우, 마우스 커서가 default로 변경됩니다.</div>
      <Button onClick={onClick} disabled={disabled}>
        text button
      </Button>
    </>
  );
};
export const DisabledButton = DisabledButtonTemplate.bind({});
