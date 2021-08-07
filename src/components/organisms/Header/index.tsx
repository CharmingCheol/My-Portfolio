import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Icon from "components/atoms/Icon";
import logo from "static/img/logo.png";
import * as S from "./index.style";

const Header = () => {
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
            <Link to="/me">Me</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
        </S.List>
      </div>
    </S.Header>
  );
};

export default Header;
