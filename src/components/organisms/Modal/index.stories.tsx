import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "components/atoms/Button";
import { GlobalContext, rootReducer } from "reducers";
import globalUISlice, { initialState as globalUIState } from "reducers/globalUI";

import Modal, { Props } from "./index";

interface StoreProps {
  reducer: ReturnType<typeof rootReducer>;
  children: React.ReactChild;
}

interface TemplateProps extends StoreProps {
  props: Props;
}

const MockGlobalStore = ({ reducer, children }: DeepPartial<StoreProps>) => (
  <Provider
    context={GlobalContext}
    store={configureStore({
      reducer: {
        globalUI: createSlice({
          name: globalUISlice.name,
          reducers: globalUISlice.caseReducers as any,
          initialState: reducer?.globalUI || globalUIState,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const Template = ({ reducer, props }: DeepPartial<TemplateProps>) => (
  <MockGlobalStore reducer={reducer}>
    <Modal modalKey="WritingDeleteModal" {...props}>
      <Modal.Header>header</Modal.Header>
      <Modal.Body>body</Modal.Body>
      <Modal.Footer>
        <Button color="sub2_away">버튼</Button>
      </Modal.Footer>
    </Modal>
  </MockGlobalStore>
);

export const DefaultTemplate: ComponentStory<typeof Modal> = () => (
  <Template reducer={{ globalUI: { modalKey: "WritingDeleteModal" } }} />
);

export const AutoCloseTemplate: ComponentStory<typeof Modal> = () => (
  <Template reducer={{ globalUI: { modalKey: "WritingDeleteModal" } }} props={{ autoClose: true }} />
);

export default {
  title: "organisms/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;
