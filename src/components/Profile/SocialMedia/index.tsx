import React, { memo, useMemo } from "react";
import { IconBaseProps } from "react-icons";
import { AiFillGithub, AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import * as S from "./style";

const ScoialMedia = () => {
  const link = useMemo(
    () => [
      {
        url: "https://github.com/CharmingCheol/",
        icon: AiFillGithub,
      },
      {
        url: "https://www.instagram.com/mc_charm.ing/",
        icon: AiOutlineInstagram,
      },
      {
        url: "mailto:toby0806@naver.com",
        icon: AiOutlineMail,
      },
    ],
    [],
  );

  return (
    <>
      <S.Layout>
        {link.map((value) => (
          <S.ListItem key={value.url}>
            <a target="_blank" rel="noreferrer" href={value.url}>
              {value.icon(value.icon as IconBaseProps)}
            </a>
          </S.ListItem>
        ))}
      </S.Layout>
    </>
  );
};

export default memo(ScoialMedia);
