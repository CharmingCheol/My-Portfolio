import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import CryptoJS from "crypto-js";
import useDecryptIP from "@hooks/useDecryptIP";
import * as S from "./style";

interface HeaderProps {
  ip: CryptoJS.lib.CipherParams | null;
}

const Header = ({ ip }: HeaderProps) => {
  const sameIp = useDecryptIP({ encryptIP: ip as CryptoJS.lib.CipherParams });
  const [toggleSettingMenu, setToggleSettingMenu] = useState(false);

  // 설정 버튼 클릭
  const clickSettingBtn = useCallback(() => {
    setToggleSettingMenu((prev) => !prev);
  }, []);

  return (
    <>
      <S.Header>
        <S.Container>
          <span>logo</span>
          {sameIp && <BsFillGearFill onClick={clickSettingBtn} />}
          {toggleSettingMenu && (
            <S.SettingMenu onClick={clickSettingBtn}>
              <Link to="/blog/write/post">글 작성하기</Link>
            </S.SettingMenu>
          )}
        </S.Container>
      </S.Header>
    </>
  );
};

export default Header;
