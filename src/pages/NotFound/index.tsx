import React from "react";
import { useHistory } from "react-router-dom";
import Button from "components/atoms/Button";
import * as S from "./index.style";

const NotFound = () => {
  const history = useHistory();

  const clickGoBackButton = () => {
    history.goBack();
  };

  return (
    <S.Layout>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>찾으시는 페이지를 찾을 수 없습니다.</p>
      <div className="buttons">
        <Button text="이전 페이지로 이동하기" onClick={clickGoBackButton} color="main_away" />
        <Button text="홈으로 이동하기" to="/" />
      </div>
    </S.Layout>
  );
};

export default NotFound;
