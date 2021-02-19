/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useContext, useState } from "react";
import { BsFillCaretUpFill } from "react-icons/bs";
import Button from "@common/Atoms/Button";
import Input from "@common/Atoms/Input";
import useInput from "@hooks/useInput";
import { SubmitPostParams } from "@apis/posts";
import { WritePostContext } from "@reducers/WritePost";
import { AlertListContext } from "@reducers/AlertList";
import { addAlert } from "@reducers/AlertList/action";
import palette from "@utils/styles/palette";
import * as S from "./style";

interface EditorFooterProps {
  categoryList: string[];
  submitPostAPI: ({ body, title, hashtag, category }: SubmitPostParams) => void;
}

const EditorFooter = ({ categoryList, submitPostAPI }: EditorFooterProps) => {
  const [categoryText, changeCategoryText, setCategoryText] = useInput("");
  const [toggleCategorySpread, setToggleCategorySpread] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const { hashtag, body, title } = useContext(WritePostContext);
  const { dispatch } = useContext(AlertListContext);

  // [카테고리 펼치기] 버튼 클릭
  const clickCategorySpreadBtn = useCallback(() => {
    setToggleCategorySpread((prev) => !prev);
  }, []);

  // 카테고리 클릭
  const clickCategoryItem = useCallback(
    (category: string) => {
      setCategoryText(category);
      setToggleCategorySpread((prev) => !prev);
    },
    [setCategoryText],
  );

  // [작성] 버튼 클릭
  const clickSubmitButton = useCallback(() => {
    try {
      const trim = (text: string) => text.trim();
      if (!trim(title)) return dispatch(addAlert({ status: "error", text: "제목이 비었습니다" }));
      if (hashtag.length === 0) return dispatch(addAlert({ status: "error", text: "해시태그가 비었습니다" }));
      if (!trim(body)) return dispatch(addAlert({ status: "error", text: "본문이 비었습니다" }));
      if (!trim(categoryText)) return dispatch(addAlert({ status: "error", text: "카테고리가 비었습니다" }));
      setDisabledBtn(true);
      submitPostAPI({ category: categoryText, body, hashtag, title });
    } catch {
      dispatch(addAlert({ status: "error", text: "서버 에러가 발생했습니다" }));
      setDisabledBtn(false);
    }
  }, [categoryText, body, dispatch, hashtag, title, submitPostAPI]);

  return (
    <>
      <S.Layout>
        <S.CategoryInput>
          <Input onChange={changeCategoryText} placeholder="카테고리를 입력하세요" value={categoryText} />
          <Button buttonColor={palette.blue4} className="category-spread-btn" onClick={clickCategorySpreadBtn}>
            <BsFillCaretUpFill />
          </Button>
          <S.CategoryList categoryCount={categoryList.length} className={toggleCategorySpread ? "opened" : "closed"}>
            {categoryList.map((category) => (
              <li key={category} onClick={() => clickCategoryItem(category)}>
                {category}
              </li>
            ))}
          </S.CategoryList>
        </S.CategoryInput>
        <Button
          buttonColor={palette.blue5}
          disabled={disabledBtn}
          disabledColor={palette.blue3}
          onClick={clickSubmitButton}
        >
          작성
        </Button>
      </S.Layout>
    </>
  );
};

export default EditorFooter;
