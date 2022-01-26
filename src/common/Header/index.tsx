import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { useAppSelector } from "store";
import Icon from "components/atoms/Icon";
import Button from "components/atoms/Button";
import logo from "static/img/logo.png";

import * as S from "./index.style";

const Header = () => {
  const isAdmin = useAppSelector((state) => state.option.isAdmin);
  const [isShowedMenu, setIsShowedMenu] = useState(false);

  const handleClickMenuButton = useCallback(() => {
    setIsShowedMenu((prev) => !prev);
  }, []);

  return (
    <S.Header>
      <div className="wrapper">
        <Icon
          icon={isShowedMenu ? AiOutlineClose : AiOutlineMenu}
          onClick={handleClickMenuButton}
          className={["menu-icon", isShowedMenu ? "close" : "hamburger"]}
        />
        <S.Logo to="/">
          <img src={logo} alt="logo" />
        </S.Logo>
        <S.List className={isShowedMenu ? "showed" : ""}>
          <li>
            <a href="https://www.notion.so/286b761eccd445e0b7f960e477eda48f" target="_blank" rel="noreferrer">
              Me
            </a>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
        </S.List>
        {isAdmin && <Button className={["write"]} text="글 작성하기" to={process.env.REACT_APP_WRITE_PAGE} />}
      </div>
    </S.Header>
  );
};

export default Header;
