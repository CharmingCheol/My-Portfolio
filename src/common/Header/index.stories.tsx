import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import { GlobalContext, rootReducer } from "reducers";
import globalUISlice, { initialState as globalUIState } from "reducers/globalUI";
import optionSlice, { initialState as optionState } from "reducers/option";

import Header from "./index";

interface Props {
  reducer: ReturnType<typeof rootReducer>;
  children: React.ReactChild;
}

const Wrapper = styled.div`
  height: 150vh;
  main {
    padding-top: 66px;
  }
`;

const MockGlobalStore = ({ reducer, children }: DeepPartial<Props>) => (
  <Provider
    context={GlobalContext}
    store={configureStore({
      reducer: {
        globalUI: createSlice({
          name: globalUISlice.name,
          reducers: globalUISlice.caseReducers as any,
          initialState: reducer?.globalUI || globalUIState,
        }).reducer,
        option: createSlice({
          name: optionSlice.name,
          reducers: optionSlice.caseReducers as any,
          initialState: reducer?.option || optionState,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const Template = ({ reducer }: DeepPartial<Props>) => (
  <MockGlobalStore reducer={reducer}>
    <MemoryRouter>
      <Wrapper>
        <Header />
      </Wrapper>
    </MemoryRouter>
  </MockGlobalStore>
);

export const DefaultHeader: ComponentStory<typeof Header> = () => <Template />;

export const AdminHeader: ComponentStory<typeof Header> = () => <Template reducer={{ option: { isAdmin: true } }} />;

export default {
  title: "common/Header",
  component: Header,
} as ComponentMeta<typeof Header>;
