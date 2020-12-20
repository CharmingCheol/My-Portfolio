import React, { useCallback, useContext, useMemo, useState } from "react";
import { projectContext } from "@pages/Project/reducer";
import { clickPopupCloseAction } from "@pages/Project/action";
import Art1 from "@components/Project/Art1";
import Art2 from "@components/Project/Art2";
import Art3 from "@components/Project/Art3";
import OpenedCube from "@components/Project/OpenedCube";
import * as S from "./style";

const classNameList = ["back", "top", "front", "bottom", "left", "right"];

const CubePopup = () => {
  const { clickedArtName, dispatch, popupData } = useContext(projectContext);
  const [visible, setVisible] = useState(true);
  const canvas = useMemo(() => {
    switch (clickedArtName) {
      case "first-art":
        return <Art1 />;
      case "second-art":
        return <Art2 />;
      case "third-art":
        return <Art3 />;
      default:
        return <></>;
    }
  }, [clickedArtName]);

  // 자세히 버튼 클릭
  const clickDetailBtn = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  // 뒤로 가기 버튼 클릭
  const clickGoBack = useCallback(() => {
    dispatch(clickPopupCloseAction());
  }, [dispatch]);

  return (
    <>
      <S.Layout>
        {visible ? (
          <S.Cube>
            {classNameList.map((value) => (
              <div key={value} className={`figure ${value}`}>
                {canvas}
              </div>
            ))}
          </S.Cube>
        ) : (
          <OpenedCube canvas={canvas} />
        )}
        {visible && (
          <S.Footer>
            <h1>{popupData.title}</h1>
            <div className="button-wrapper">
              <button type="button" onClick={clickDetailBtn}>
                자세히
              </button>
              <button type="button" onClick={clickGoBack}>
                뒤로 가기
              </button>
            </div>
          </S.Footer>
        )}
      </S.Layout>
    </>
  );
};

export default CubePopup;
