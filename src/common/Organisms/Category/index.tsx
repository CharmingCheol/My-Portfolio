import React, { useEffect, useCallback, useLayoutEffect, useState } from "react";
import CryptoJS from "crypto-js";
import {
  BsArrowLeft,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsFilePlus,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsX,
} from "react-icons/bs";
import Button from "@common/Atoms/Button";
import Input from "@common/Atoms/Input";
import useDecryptIP from "@hooks/useDecryptIP";
import useInput from "@hooks/useInput";
import palette from "@utils/styles/palette";
import * as S from "./style";

interface CategoryProps {
  categoryList: string[];
  ip: CryptoJS.lib.CipherParams | null;
}

const Category = ({ categoryList, ip }: CategoryProps) => {
  const sameIp = useDecryptIP({ encryptIP: ip as CryptoJS.lib.CipherParams });
  const [inputText, chagneInput, setInputText] = useInput("");
  const [toggleModify, setToggleModify] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [tempCategoryList, setTempCategoryList] = useState<string[]>([]);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  // 카테고리 메뉴 열기 버튼 클릭
  const clickCategoryOpenBtn = useCallback(() => {
    setToggleOpen((prev) => !prev);
  }, []);

  // 수정하기 버튼 클릭
  const clickModifyBtn = useCallback(() => {
    setInputText("");
    setDisabledSubmitBtn(true);
    setToggleModify((prev) => {
      if (prev) setTempCategoryList(categoryList);
      return !prev;
    });
  }, [categoryList, setInputText]);

  // 위로 가기, 아래로 가기 버튼 클릭
  const clickUpDownBtn = useCallback(({ index, updown }: { index: number; updown: "up" | "down" }) => {
    setTempCategoryList((prev) => {
      const temp = prev[index];
      if (updown === "up") {
        const up = prev[index - 1];
        return [...prev.slice(0, index - 1), temp, up, ...prev.slice(index + 1, prev.length)];
      }
      const down = prev[index + 1];
      return [...prev.slice(0, index), down, temp, ...prev.slice(index + 2, prev.length)];
    });
  }, []);

  // 제거하기 버튼 클릭
  const clickRemoveBtn = useCallback((index: number) => {
    setTempCategoryList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)]);
  }, []);

  // 입력하기 버튼 클릭
  const clickHashTagAddBtn = useCallback(() => {
    setInputText("");
    setTempCategoryList((prev) => {
      if (prev.includes(inputText)) return prev;
      return [...prev, inputText];
    });
  }, [inputText, setInputText]);

  // 저장하기 버튼 클릭
  const saveHashTagListBtn = useCallback(() => {}, []);

  // 최초에 임시 카테고리 리스트를 전달받은 카테고리 리스트로 저장
  useLayoutEffect(() => {
    setTempCategoryList(categoryList);
  }, [categoryList]);

  // tempCategoryList의 변동이 있을 경우 [저장] 버튼 활성화
  useEffect(() => {
    if (tempCategoryList.length !== categoryList.length) {
      setDisabledSubmitBtn(false);
    } else {
      tempCategoryList.forEach((category, index) => {
        if (category !== categoryList[index]) return setDisabledSubmitBtn(false);
      });
    }
  }, [categoryList, tempCategoryList]);

  return (
    <>
      <S.Category className={`${toggleOpen && "opened"}`}>
        {toggleOpen ? (
          <BsChevronDoubleLeft className="category-open" onClick={clickCategoryOpenBtn} />
        ) : (
          <BsChevronDoubleRight className="category-open" onClick={clickCategoryOpenBtn} />
        )}
        {sameIp && (
          <>
            {toggleModify ? (
              <BsArrowLeft className="category-modify" onClick={clickModifyBtn} />
            ) : (
              <BsFilePlus className="category-modify" onClick={clickModifyBtn} />
            )}
          </>
        )}
        <S.CategoryList>
          {toggleModify ? (
            <>
              <S.CategoryInput>
                <div className="input-wrapper">
                  <Input onChange={chagneInput} placeholder="해시태그 입력창" value={inputText} />
                  <Button onClick={clickHashTagAddBtn}>입력</Button>
                </div>
                <Button
                  onClick={saveHashTagListBtn}
                  buttonColor={palette.blue5}
                  className="submit-btn"
                  disabled={disabledSubmitBtn}
                  disabledColor={palette.blue3}
                >
                  저장
                </Button>
              </S.CategoryInput>
              {tempCategoryList.map((category, index) => (
                <S.ModifyMenu key={category}>
                  <span>{category}</span>
                  <div className="icon-wrapper">
                    {index !== 0 && <BsFillCaretUpFill onClick={() => clickUpDownBtn({ index, updown: "up" })} />}
                    {index !== tempCategoryList.length - 1 && (
                      <BsFillCaretDownFill onClick={() => clickUpDownBtn({ index, updown: "down" })} />
                    )}
                    <BsX onClick={() => clickRemoveBtn(index)} />
                  </div>
                </S.ModifyMenu>
              ))}
            </>
          ) : (
            <>
              {categoryList.map((category) => (
                <S.Link key={category} to={`/blog/${category}`}>
                  {category}
                </S.Link>
              ))}
            </>
          )}
        </S.CategoryList>
      </S.Category>
      <S.Block className={`${toggleOpen && "opened"}`} />
    </>
  );
};

export default Category;
