import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Meta } from "@storybook/react/types-6-0";
import useInput from "@hooks/useInput";
import AlertListProvider, { AlertListContext } from "@reducers/AlertList";
import { addAlert } from "@reducers/AlertList/action";
import AlertList from "./index";

export default {
  title: "molecules/AlertList",
  component: AlertList,
} as Meta;

// 기본 AlertList
const Template = () => {
  const { dispatch } = useContext(AlertListContext);
  const [successText, changeSuccessText] = useInput("");
  const [errorText, changeErrorText] = useInput("");

  const clickSuccessBtn = useCallback(() => {
    dispatch(addAlert({ status: "success", text: successText }));
  }, [dispatch, successText]);

  const clickErrorBtn = useCallback(() => {
    dispatch(addAlert({ status: "error", text: errorText }));
  }, [dispatch, errorText]);

  return (
    <>
      <Layout>
        <input type="text" value={successText} onChange={changeSuccessText} />
        <button type="button" onClick={clickSuccessBtn}>
          성공
        </button>
      </Layout>
      <Layout>
        <input type="text" value={errorText} onChange={changeErrorText} />
        <button type="button" onClick={clickErrorBtn}>
          에러
        </button>
      </Layout>
      <AlertList />
    </>
  );
};
const Provider = () => (
  <AlertListProvider>
    <Template />
  </AlertListProvider>
);
export const DefaultAlertList = Provider.bind({});

// 레이아웃
const Layout = styled.div`
  display: flex;
  input {
    color: black;
  }
  button {
    color: black;
    cursor: pointer;
  }
`;
