import React from "react";
import styled from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react/types-6-0";
import CryptoJS from "crypto-js";
import Header from "./index";

export default {
  title: "organisms/Header",
  component: Header,
} as Meta;

const Layout = styled.div`
  height: 300vh;
`;

const Template = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <Layout>{children}</Layout>
  </MemoryRouter>
);

// IP가 일치하지 않은 props
const DiffrentIpTemplate = () => {
  const ip = CryptoJS.AES.encrypt("000.0.000.000", process.env.DECRYPT_KEY as string);
  return (
    <Template>
      <Header ip={ip} />
    </Template>
  );
};
export const DiffrentIp = DiffrentIpTemplate.bind({});

// IP가 일치하지 않은 props
const SameIpTemplate = () => {
  const ip = CryptoJS.AES.encrypt(process.env.MY_IP as string, process.env.DECRYPT_KEY as string);
  return (
    <Template>
      <Header ip={ip} />
    </Template>
  );
};
export const SameIp = SameIpTemplate.bind({});
