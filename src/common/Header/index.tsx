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
        <S.Logo to="/portfolio">
          <img src={logo} alt="logo" />
        </S.Logo>
        <S.List className={isShowedMenu ? "showed" : ""}>
          <li>
            <Link to="/portfolio/me">Me</Link>
          </li>
          <li>
            <Link to="/portfolio/project">Project</Link>
          </li>
        </S.List>
        {isAdmin && <Button className={["write"]} text="글 작성하기" to={process.env.WRITE_PAGE} />}
      </div>
    </S.Header>
  );
};

export default Header;
