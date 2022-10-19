import React from "react";
import { Meta, Story } from "@storybook/react";

import Button from "components/atoms/Button";
import { globalUIActions } from "reducers/globalUI";
import { useAppDispatch } from "reducers";

import Modal, { Props } from "./index";

export default {
  title: "organisms/Modal",
  component: Modal,
} as Meta;

const DefaultModalTemplate: Story<Props> = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>
        Modal 컴포넌트에 모달 식별자를 의미하는 modalKey에 값을 전달합니다.
        <br />
        모달을 출력하고 싶을 경우, globalUI 액션에서 openModal 함수를 호출, 인자값으로 모달 식별자 값을 전달합니다.
        <br />
        모달을 닫고 싶을 경우, globalUI 액션에서 closeModal 함수를 호출합니다.
      </p>
      <Button onClick={() => dispatch(globalUIActions.openModal("WritingDeleteModal"))}>open modal</Button>
      <Modal modalKey="WritingDeleteModal">
        <Modal.Header>header</Modal.Header>
        <Modal.Body>bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(globalUIActions.closeModal())} color="sub2_away">
            close modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export const DefaultModal = DefaultModalTemplate.bind({});

const NotAutoCloseModalTemplate: Story<Props> = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>autoClose가 false인 경우, 바깥 부분이나 esc를 입력해도 모달이 닫히지 않습니다.</p>
      <Button onClick={() => dispatch(globalUIActions.openModal("WritingDeleteModal"))}>open modal</Button>
      <Modal modalKey="WritingDeleteModal" autoClose={false}>
        <Modal.Header>header</Modal.Header>
        <Modal.Body>bodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybodybody</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(globalUIActions.closeModal())} color="sub2_away">
            close modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export const NotAutoCloseModal = NotAutoCloseModalTemplate.bind({});
