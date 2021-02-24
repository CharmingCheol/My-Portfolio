import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Modal, { ModalProps } from "./index";

export default {
  title: "organisms/Modal",
  component: Modal,
} as Meta;

// Modal 활성화
const ActivedTemplate: Story<ModalProps> = (args) => {
  return (
    <>
      <Modal {...args} modalClassName="active">
        modal container
      </Modal>
    </>
  );
};
export const ActivedModal = ActivedTemplate.bind({});

// Modal 비활성화
const DisabledTemplate: Story<ModalProps> = (args) => {
  return (
    <>
      <Modal {...args}>modal container</Modal>
    </>
  );
};
export const DisabledModal = DisabledTemplate.bind({});
