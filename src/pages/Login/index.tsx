import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store";
import { optionActions } from "reducers/option";
import Button from "components/atoms/Button";
import { encrypt } from "utils";
import * as S from "./index.style";

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // id 인풋값 변경
  const changeIdInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }, []);

  // password 인풋값 변경
  const changePasswordInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  // 로그인 버튼 클릭
  const clickLoginButton = useCallback(() => {
    if (!id.trim() || !password.trim()) return;
    if (process.env.ID === id && process.env.PASSWORD === password) {
      const encrypted = encrypt(process.env.LOG_IN_TEXT as string);
      window.sessionStorage.setItem("login", encrypted);
      dispatch(optionActions.changeIsAdmin(true));
    }
    history.replace("/");
  }, [dispatch, history, id, password]);

  return (
    <S.Layout>
      <div className="wrapper">
        <h2>로그인</h2>
        <input type="text" placeholder="아이디" className="id" value={id} onChange={changeIdInput} />
        <input
          type="password"
          placeholder="비밀번호"
          className="password"
          value={password}
          onChange={changePasswordInput}
        />
        <Button onClick={clickLoginButton}>로그인</Button>
      </div>
    </S.Layout>
  );
};

export default Login;
