import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { palette, PaletteType } from "./palette";

const Wrapper = styled.div`
  display: flex;
  div {
    width: 100px;
    height: 100px;
    margin: 8px 4px;
  }
`;

const PaletteComponent = ({ colors }: { colors: PaletteType[] }) => {
  return (
    <Wrapper>
      {colors.map((color) => (
        <div style={{ backgroundColor: palette[color] }} />
      ))}
    </Wrapper>
  );
};

const PaletteTempalate = () => {
  return (
    <>
      <div>
        <p>navy - page에서 대표적으로 사용하는 color</p>
        <PaletteComponent colors={["navy_20", "navy_40", "navy_60", "navy_80", "navy_100"]} />
      </div>
      <div>
        <p>white - main color의 sub가 되는 color</p>
        <PaletteComponent colors={["white_20", "white_40", "white_60", "white_80", "white_100"]} />
      </div>
      <div>
        <p>red - 실패, 에러 등과 같이 부정적인 메시지를 전달하는 color</p>
        <PaletteComponent colors={["red_20", "red_40", "red_60", "red_80", "red_100"]} />
      </div>
      <div>
        <p>green - 성공과 같이 긍정적인 메시지를 전달하는 color</p>
        <PaletteComponent colors={["green_20", "green_40", "green_60", "green_80", "green_100"]} />
      </div>
      <div>
        <p>black - font에서 대표적으로 사용되는 color</p>
        <PaletteComponent colors={["black_20", "black_40", "black_60", "black_80", "black_100"]} />
      </div>
      <div>
        <p>gray - black text color와 구분짓기 위해 사용되는 sub color</p>
        <PaletteComponent colors={["gray_20", "gray_40", "gray_60", "gray_80", "gray_100"]} />
      </div>
    </>
  );
};
export const Palette = PaletteTempalate.bind({});

export default {
  title: "style/Palette",
  component: PaletteComponent,
} as Meta;
