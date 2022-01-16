import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import MainLayout from "./index";

export default {
  title: "common/MainLayout",
  component: MainLayout,
} as Meta;

const Children = styled.div`
  background: rgb(200, 200, 200);
  height: 100vh;
`;

const DefaultMainLayoutTemplate = () => (
  <MemoryRouter>
    <MainLayout>
      <Children />
    </MainLayout>
  </MemoryRouter>
);
export const DefaultMainLayout = DefaultMainLayoutTemplate.bind({});
