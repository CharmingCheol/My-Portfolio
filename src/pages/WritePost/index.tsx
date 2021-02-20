import React, { useCallback, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ContentInput from "@components/WritePost/ContentInput";
import HashTagInput from "@components/WritePost/HashTagInput";
import MarkDownPreview from "@components/WritePost/MarkDownPreview";
import TitleInput from "@components/WritePost/TitleInput";
import WritePostFooter from "@components/WritePost/WritePostFooter";
import WritePostSetting from "@components/WritePost/WritePostSetting";
import useImageUpload from "@hooks/useImageUpload";
import { submitPost, SubmitPostParams } from "@apis/posts";
import { postImageUpload } from "@apis/images";
import { getCategorys } from "@apis/categorys";
import WritePostProvider from "@reducers/WritePost";
import { CategoryList } from "@typings/db";
import * as S from "./style";

const WritePost = () => {
  const history = useHistory();
  const [imageUrl, selectImage] = useImageUpload({ api: postImageUpload });
  const [categoryList, setCategoryList] = useState<string[]>([]);

  // 게시글 데이터 submit
  const submitPostAPI = useCallback(
    async ({ body, category, hashtag, thumbnail, title }: SubmitPostParams) => {
      const { data } = await submitPost({ body, category, hashtag, thumbnail, title });
      history.replace(`/blog/${data.category}/${data._id}`);
    },
    [history],
  );

  // 카테고리 리스트 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { data }: { data: CategoryList[] } = await getCategorys();
        const extractCategory = data.map(({ category }) => category);
        setCategoryList(extractCategory);
      } catch {
        setCategoryList([]);
      }
    };
    callback();
  }, []);

  return (
    <>
      <WritePostProvider>
        <S.Section className="left-section">
          <TitleInput />
          <HashTagInput />
          <ContentInput imageUrl={imageUrl} imageUploadCallBack={selectImage} />
          <WritePostFooter categoryList={categoryList} submitPostAPI={submitPostAPI} />
        </S.Section>
        <S.Section className="right-section">
          <MarkDownPreview />
        </S.Section>
        <WritePostSetting />
      </WritePostProvider>
    </>
  );
};

export default WritePost;
