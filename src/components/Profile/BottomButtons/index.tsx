import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import throttle from "lodash.throttle";
import { BsFillGearFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";

import { ProfileContext } from "@pages/Profile/reducer";
import { clickGearIconAction, textVolumeDragAction } from "@pages/Profile/action";
import * as S from "./style";

const BottomButtons = () => {
  const { dispatch } = useContext(ProfileContext);
  const history = useHistory();
  const [printMenu, setPrintMenu] = useState(false);
  const [buttonPostion, setButtonPostion] = useState(0);
  const [powerBtnColor, setPowerBtnColor] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const setTimeOutId = useRef(0);
  const throttled = useRef(throttle((newValue: number) => dispatch(textVolumeDragAction(newValue)), 300));

  // 볼륨 조절 버튼 드래그
  const dragButton = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!graphRef.current || !buttonRef.current) return;
    const graphPos = graphRef.current.getBoundingClientRect();
    const buttonHeight = buttonRef.current.offsetHeight;
    if (event.clientY + buttonHeight <= graphPos.bottom - buttonHeight + 4 && event.clientY >= graphPos.top) {
      const nextButtonPos = event.clientY - graphPos.top;
      const ratio = nextButtonPos / graphPos.height;
      buttonRef.current.style.top = `${ratio * 100}%`;
      if (ratio < 0.5) {
        setButtonPostion((nextButtonPos * 100) / (graphPos.height - buttonHeight * 2 + 4));
      } else {
        setButtonPostion(Math.ceil((nextButtonPos * 100) / (graphPos.height - buttonHeight * 2 + 4)));
      }
    }
  }, []);

  // 기어 아이콘 클릭
  const clickGearIcon = useCallback(() => {
    setPrintMenu((prev) => !prev);
    dispatch(clickGearIconAction(printMenu));
  }, [dispatch, printMenu]);

  // 전원 아이콘 클릭
  const clickPowerOffIcon = useCallback(() => {
    setPowerBtnColor((prev) => !prev);
    setTimeOutId.current = setTimeout(() => {
      history.push("/");
    }, 2200);
  }, [history]);

  useEffect(() => {
    throttled.current(buttonPostion);
  }, [buttonPostion]);

  useEffect(() => {
    return () => clearTimeout(setTimeOutId.current);
  }, []);

  return (
    <>
      <S.Layout>
        <S.VolumeWrapper>
          <S.VolumeGraph ref={graphRef} />
          <S.DragButton ref={buttonRef} onDrag={dragButton} draggable="true" />
          <p>{Math.floor(buttonPostion)}</p>
        </S.VolumeWrapper>
        <S.ButtonWrapper powerBtnColor={powerBtnColor}>
          <BsFillGearFill onClick={clickGearIcon} />
          <FaPowerOff className="power" onClick={clickPowerOffIcon} />
        </S.ButtonWrapper>
      </S.Layout>
    </>
  );
};

export default memo(BottomButtons);
