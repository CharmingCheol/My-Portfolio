import React, { useCallback, useContext, useLayoutEffect, useState } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import ContentInput from "@components/WritePost/ContentInput";
import HashTagInput from "@components/WritePost/HashTagInput";
import MarkDownPreview from "@components/WritePost/MarkDownPreview";
import TitleInput from "@components/WritePost/TitleInput";
import WritePostFooter from "@components/WritePost/WritePostFooter";
import WritePostSetting from "@components/WritePost/WritePostSetting";
import useImageUpload from "@hooks/useImageUpload";
import { getPostDetail, submitPost, updatePost, SubmitPostParams } from "@apis/posts";
import { postImageUpload } from "@apis/images";
import { getCategorys } from "@apis/categorys";
import { AlertListContext } from "@reducers/AlertList";
import { addAlert } from "@reducers/AlertList/action";
import { WritePostContext } from "@reducers/WritePost";
import { initializePostData } from "@reducers/WritePost/action";
import { CategoryList } from "@typings/db";
import * as S from "./style";

const WritePost = () => {
  const history = useHistory();
  const location = useLocation();
  const { dispatch: alertDispatch } = useContext(AlertListContext);
  const { dispatch: writePostDispatch } = useContext(WritePostContext);
  const [imageUrl, selectImage] = useImageUpload({ api: postImageUpload });
  const [categoryList, setCategoryList] = useState<string[]>([]);

  // 게시글 데이터 submit
  const submitPostAPI = useCallback(
    async ({ body, category, hashtag, thumbnail, title }: SubmitPostParams) => {
      const { id } = queryString.parse(location.search);
      const { data } = id
        ? await updatePost({ body, category, hashtag, thumbnail, title })
        : await submitPost({ body, category, hashtag, thumbnail, title });
      history.replace(`/blog/${data.category}/${data._id}`);
    },
    [history, location],
  );

  // 수정 할 게시글 데이터 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { category, id } = queryString.parse(location.search);
        if (!category || !id || typeof category === "object" || typeof id === "object") return;
        const {
          data: { title, hashtag, body, category: categoryData, thumbnail },
        } = await getPostDetail({ category, id });
        writePostDispatch(initializePostData({ title, hashtag, body, category: categoryData, thumbnail }));
      } catch {
        alertDispatch(addAlert({ status: "error", text: "수정 게시글 불러오기 실패" }));
      }
    };
    callback();
  }, [alertDispatch, location, writePostDispatch]);

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
    </>
  );
};

export default WritePost;
