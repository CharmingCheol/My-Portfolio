import React from "react";
import WritePostProvider from "@reducers/WritePost";
import WritePost from "./index";

const WritePostStore = () => {
  return (
    <>
      <WritePostProvider>
        <WritePost />
      </WritePostProvider>
    </>
  );
};

export default WritePostStore;
