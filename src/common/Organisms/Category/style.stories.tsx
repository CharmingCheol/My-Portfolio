import React from "react";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import CryptoJS from "crypto-js";
import { Meta } from "@storybook/react/types-6-0";
import { array } from "@storybook/addon-knobs";
import media from "@utils/styles/media";
import Category from "./index";

export default {
  title: "organisms/Category",
  component: Category,
} as Meta;

const { DECRYPT_KEY, MY_IP } = process.env;
const LIST = ["React", "Typescript", "Pyhton", "Webpack", "AWS", "DevOps"];
const Layout = styled.div`
  width: 1728px;
  height: 100vh;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
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

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <Layout>{children}</Layout>
    </MemoryRouter>
  );
};

// IP가 일치하지 않은 props
const DiffrentIpTemplate = () => {
  const categoryList = array("categoryList", LIST);
  const ip = CryptoJS.AES.encrypt("000.0.000.000", DECRYPT_KEY as string);
  return (
    <Template>
      <Category categoryList={categoryList} ip={ip} />
    </Template>
  );
};
export const DiffrentIp = DiffrentIpTemplate.bind({});

// IP가 일치하는 props
const SameIpTemplate = () => {
  const categoryList = array("categoryList", LIST);
  const ip = CryptoJS.AES.encrypt(MY_IP as string, DECRYPT_KEY as string);
  return (
    <Template>
      <Category categoryList={categoryList} ip={ip} />
    </Template>
  );
};
export const SameIp = SameIpTemplate.bind({});
