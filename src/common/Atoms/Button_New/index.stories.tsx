import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ColorType } from "./type";
import Button, { Props } from "./index";

export default {
  title: "atoms/Button_New",
  component: Button,
} as Meta;

const Wrapper = styled.div`
  display: flex;
  button,
  a {
    margin: 4px;
  }
`;

// Button, Link, Anchor 버튼
const ButtonTypeTemplate: Story<Props> = () => {
  return (
    <Wrapper>
      <Button text="button" />
      <Button text="anchor" href="/" />
      <Button text="new tab anchor" href="/" newTab />
      <MemoryRouter>
        <Button text="link" to="/" />
      </MemoryRouter>
    </Wrapper>
  );
};
export const ButtonType = ButtonTypeTemplate.bind({});

// 버튼 event
const ButtonEventTemplate: Story<Props> = () => {
  return (
    <Wrapper>
      <Button text="onClick" onClick={action("onClick")} />
      <Button text="onDoubleClick" onDoubleClick={action("onDoubleClick")} />
      <Button text="onContextMenu" onContextMenu={action("onContextMenu")} />
      <Button text="onFocus / onBlur" onFocus={action("onFocus")} onBlur={action("onBlur")} />
      <Button
        text="onMouseEnter / onMouseLeave"
        onMouseEnter={action("onMouseEnter")}
        onMouseLeave={action("onMouseLeave")}
      />
      <Button text="onMouseDown / onMouseUp" onMouseDown={action("onMouseDown")} onMouseUp={action("onMouseUp")} />
    </Wrapper>
  );
};
export const ButtonEvent = ButtonEventTemplate.bind({});

// 버튼 크기
const SizeTemplate: Story<Props> = () => {
  return (
    <Wrapper>
      <Button text="primary" size="primary" />
      <Button text="medium" size="medium" />
      <Button text="large" size="large" />
      <Button text="xlarge" size="xlarge" />
      <Button text="xxlarge" size="xxlarge" />
    </Wrapper>
  );
};
export const ButtonSize = SizeTemplate.bind({});

// 버튼 색상
const ColorTemplate: Story<Props> = () => {
  return (
    <Wrapper>
      <Button text="primary" color="main" />
      <Button text="sub1" color="sub1" />
      <Button text="sub2" color="sub2" />
      <Button text="outline" color="outline" />
    </Wrapper>
  );
};
export const ButtonColor = ColorTemplate.bind({});

// 버튼 disabled
const DisabledTemplate: Story<Props> = () => {
  const [disabled, setDisabled] = useState(false);
  const onClick = () => setDisabled((prev) => !prev);
  return <Button text="Click Me!" disabled={disabled} onClick={onClick} />;
};
export const DisabledButton = DisabledTemplate.bind({});

// circled 버튼
const CircledButtonTemplate: Story<Props> = () => {
  return <Button text="circled" circled />;
};
export const CircledButton = CircledButtonTemplate.bind({});

// 버튼 case
const ButtonCaseTemplate: Story<Props> = () => {
  const size: ColorType[] = ["main", "sub1", "sub2", "outline"];
  return (
    <>
      {size.map((value) => (
        <Wrapper>
          <Button text="primary" color={value} size="primary" />
          <Button text="medium" color={value} size="medium" />
          <Button text="large" color={value} size="large" />
          <Button text="xlarge" color={value} size="xlarge" />
          <Button text="xxlarge" color={value} size="xxlarge" />
        </Wrapper>
      ))}
    </>
  );
};
export const ButtonCase = ButtonCaseTemplate.bind({});

// 아이콘이 있는 버튼(좌, 우, 아이콘만)