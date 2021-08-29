import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta, Story } from "@storybook/react";
import SettingModal, { Props } from "./index";

export default {
  title: "pages/Write",
  component: SettingModal,
} as Meta;

const SettingModalTemplate: Story<Props> = (props) => {
  return (
    <MemoryRouter>
      <SettingModal {...props} />
    </MemoryRouter>
  );
};
export const SettingModalCase = SettingModalTemplate.bind({});
