import React, { useState } from "react";
import { Meta } from "@storybook/react";
import Modal, { Props } from "./index";

export default {
  title: "organisms/Modal",
  component: Modal,
} as Meta;

const DefaultModalTemplate = (props: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpened(true)}>
        modal open
      </button>
      <Modal {...props} isOpened={isOpened}>
        <div>hello modal</div>
        <button type="button" onClick={() => setIsOpened(false)}>
          modal close
        </button>
      </Modal>
    </>
  );
};
export const DefaultModal = DefaultModalTemplate.bind({});

const MultipleModalTemplate = (props: Props) => {
  const [isOpenedOuter, setIsOpenedOuter] = useState(false);
  const [isOpenedInner, setIsOpenedInner] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpenedOuter(true)}>
        outer modal open
      </button>
      <Modal {...props} isOpened={isOpenedOuter} className="outer-modal">
        <div>hello outer modal</div>
        <button type="button" onClick={() => setIsOpenedOuter(false)}>
          outer modal close
        </button>
        <button type="button" onClick={() => setIsOpenedInner(true)}>
          inner modal open
        </button>
        <Modal isOpened={isOpenedInner} className="outer-modal" size="small_wide">
          <div>hello inner modal</div>
          <button type="button" onClick={() => setIsOpenedInner(false)}>
            inner modal close
          </button>
        </Modal>
      </Modal>
    </>
  );
};
export const MultipleModal = MultipleModalTemplate.bind({});
