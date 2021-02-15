import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ContentInput from "@components/WritePost/ContentInput";
import HashTagInput from "@components/WritePost/HashTagInput";
import MarkDownPreview from "@components/WritePost/MarkDownPreview";
import TitleInput from "@components/WritePost/TitleInput";
import WritePostFooter from "@components/WritePost/WritePostFooter";
import useImageUpload from "@hooks/useImageUpload";
import { submitPost, SubmitPostParams } from "@apis/posts";
import { postImageUpload } from "@apis/images";
import WritePostProvider from "@reducers/WritePost";
import MarkDownEditorProvider from "@reducers/MarkDownEditor";
import * as S from "./style";

const WritePost = () => {
  const history = useHistory();
  const [imageUrl, selectImage] = useImageUpload({ api: postImageUpload });

  // 게시글 데이터 submit
  const submitPostAPI = useCallback(
    async ({ body, category, hashtag, title }: SubmitPostParams) => {
      const { data } = await submitPost({ body, category, hashtag, title });
      history.replace(`/blog/post?id=${data._id}`);
    },
    [history],
  );

  return (
    <>
      <WritePostProvider>
        <MarkDownEditorProvider>
          <S.Section className="left-section">
            <TitleInput />
            <HashTagInput />
            <ContentInput imageUrl={imageUrl} imageUploadCallBack={selectImage} />
            <WritePostFooter categoryList={[]} submitPostAPI={submitPostAPI} />
          </S.Section>
          <S.Section className="right-section">
            <MarkDownPreview />
          </S.Section>
        </MarkDownEditorProvider>
      </WritePostProvider>
    </>
  );
};

export default WritePost;
