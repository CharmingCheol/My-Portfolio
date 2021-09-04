import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import Header from "./index";

export default {
  title: "common/Header",
  component: Header,
} as Meta;

const Wrapper = styled.div`
  height: 150vh;
`;

const DefaultHeaderTemplate = () => (
  <MemoryRouter>
    <Wrapper>
      <Header />
      <main />
    </Wrapper>
  </MemoryRouter>
);
export const DefaultHeader = DefaultHeaderTemplate.bind({});
