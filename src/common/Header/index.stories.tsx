import React, { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { useAppDispatch } from "store";
import { changeIsAdmin } from "reducers/option";
import Header from "./index";

export default {
  title: "common/Header",
  component: Header,
} as Meta;

const Wrapper = styled.div`
  height: 150vh;
  main {
    padding-top: 66px;
  }
`;

const DefaultHeaderTemplate = () => (
  <MemoryRouter>
    <Wrapper>
      <Header />
      <main>
        <span>hello</span>
      </main>
    </Wrapper>
  </MemoryRouter>
);
export const DefaultHeader = DefaultHeaderTemplate.bind({});

const AdminHeaderTemplate = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeIsAdmin(true));
    return () => {
      dispatch(changeIsAdmin(false));
    };
  }, [dispatch]);
  return (
    <MemoryRouter>
      <Wrapper>
        <Header />
        <main />
      </Wrapper>
    </MemoryRouter>
  );
};
export const AdminHeader = AdminHeaderTemplate.bind({});
