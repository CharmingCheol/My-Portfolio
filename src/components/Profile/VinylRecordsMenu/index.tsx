import React, { memo, useContext, useCallback, useMemo } from "react";

import { ProfileContext } from "@pages/Profile/reducer";
import { lpCoverClickAction } from "@pages/Profile/action";
import { BackgroundColorKey } from "@pages/Profile/type";
import VinylRecord from "@static/svg/vinylRecord";
import * as S from "./style";

const VinylRecordsMenu = () => {
  const { dispatch, printMenu } = useContext(ProfileContext);
  const list = useMemo(
    () => [
      {
        title: "keyword",
        color: "#68ca00",
      },
      {
        title: "skills",
        color: "#003a66",
      },
      {
        title: "resume",
        color: "#e9e9b1",
      },
    ],
    [],
  );

  const clickLpCover = useCallback(
    (color: BackgroundColorKey) => {
      dispatch(lpCoverClickAction(color));
    },
    [dispatch],
  );

  return (
    <>
      <S.List printMenu={printMenu}>
        {list.map((value) => (
          <S.ListItem key={value.title}>
            <S.Cover onClick={() => clickLpCover(value.title as BackgroundColorKey)} color={value.color} />
            <VinylRecord />
          </S.ListItem>
        ))}
      </S.List>
    </>
  );
};

export default memo(VinylRecordsMenu);
