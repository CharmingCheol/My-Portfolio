import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { array } from "@storybook/addon-knobs";
import ContentInput from "@components/WritePost/ContentInput";
import HashTagInput from "@components/WritePost/HashTagInput";
import TitleInput from "@components/WritePost/TitleInput";
import WritePostFooter from "@components/WritePost/WritePostFooter";
import MarkDownPreview from "@components/WritePost/MarkDownPreview";
import WritePostSetting from "@components/WritePost/WritePostSetting";
import Context from "@reducers/WritePost";
import * as S from "./style";

export default {
  title: "pages/WritePost",
} as Meta;

const Layout = () => {
  const categoryList = array("categoryList", ["React", "Javascript", "Webpack", "Express"]);

  return (
    <>
      <S.Section className="left-section">
        <TitleInput />
        <HashTagInput />
        <ContentInput imageUrl="" imageUploadCallBack={() => {}} />
        <WritePostFooter categoryList={categoryList} submitPostAPI={() => {}} />
      </S.Section>
      <S.Section className="right-section">
        <MarkDownPreview />
      </S.Section>
      <WritePostSetting />
    </>
  );
};

const Template = () => {
  return (
    <S.Layout>
      <Context>
        <Layout />
      </Context>
    </S.Layout>
  );
};

// 기본 HashTag
export const WritePostPage = Template.bind({});
