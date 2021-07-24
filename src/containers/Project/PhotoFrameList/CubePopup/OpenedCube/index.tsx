import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AiFillGithub, AiOutlineClose } from "react-icons/ai";
import { projectContext } from "@pages/Project/reducer";
import { clickPopupCloseAction } from "@pages/Project/action";
import textScale from "@utils/modules/textScale";
import Factory from "./factory";
import * as S from "./style";

/**
 * @param canvas 펼쳐진 큐브에 그려질 캔버스
 */
interface Props {
  canvas: JSX.Element;
}

const firstLine = ["first-line-left", "first-line-center", "first-line-right"];
const secondLine = ["second-line-left", "second-line-center", "second-line-right"];

const OpenedCube = ({ canvas }: Props) => {
  const { dispatch, popupData } = useContext(projectContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textList = useRef<Factory[]>([]);
  const animationId = useRef(0);
  const [hideCube, setHideCube] = useState(true);

  // 닫기 버튼 클릭
  const clickCloseBtn = useCallback(() => {
    dispatch(clickPopupCloseAction());
  }, [dispatch]);

  // init, resize에서 캔버스 초기화
  const initCanvas = useCallback(() => {
    if (!canvasRef.current || !popupData?.date) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { clientWidth, clientHeight } = canvasRef.current.parentElement as HTMLDivElement;
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    const regExp = /(([A-Z][a-z]*-([A-Z]|[a-z])[a-z]*)|[A-Z][a-z]*)/g;
    const sentence = `${popupData.tech.join("").replaceAll(regExp, " $1")} `;
    const fontSize = clientHeight / 1.333333333;

    ctx.clearRect(0, 0, clientWidth, clientHeight);
    textList.current = [];

    for (let i = 0; i < sentence.length; i += 1) {
      const widthScale = textScale.find((value) => value.text === sentence[i])?.scale as number;
      const heightScale = 0.7584056627622819;
      textList.current.push(
        new Factory({
          x: i === 0 ? clientWidth : textList.current[i - 1].x + textList.current[i - 1].width,
          fontSize,
          text: sentence[i],
          width: fontSize / widthScale,
          height: fontSize / heightScale,
        }),
      );
    }
  }, [popupData]);

  // 캔버스를 그리는 함수
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const textListLength = textList.current.length;
    const { clientWidth, clientHeight } = canvasRef.current.parentElement as HTMLDivElement;

    ctx.clearRect(0, 0, clientWidth, clientHeight);
    for (let i = 0; i < textListLength; i += 1) textList.current[i].drawText(ctx);
    if (textList.current[0].x < -100) {
      const { x, fontSize, width, height } = textList.current[textListLength - 1];
      textList.current.push(
        new Factory({
          x: x + width,
          fontSize,
          text: textList.current[0].text,
          width: textList.current[0].width,
          height,
        }),
      );
      textList.current.shift();
    }
  }, []);

  // 캔버스 최초 설정
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // 캔버스 requestAnimationFrame
  useEffect(() => {
    function loop() {
      drawCanvas();
      animationId.current = requestAnimationFrame(loop);
    }
    animationId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId.current);
  }, [drawCanvas]);

  // resize event
  useEffect(() => {
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // 5.5초 뒤에 큐브 캔버스가 사라지도록 설정
  useEffect(() => {
    setTimeout(() => {
      setHideCube(false);
    }, 4500);
  }, []);

  return (
    <>
      <S.Layout>
        {hideCube && (
          <S.Wrapper>
            <div className="line-wrapper">
              <div className="line first-line">
                {firstLine.map((value) => (
                  <S.Card key={value} className={`figure ${value}`}>
                    {canvas}
                  </S.Card>
                ))}
              </div>
              <div className="line second-line">
                {secondLine.map((value) => (
                  <S.Card key={value} className={`figure ${value}`}>
                    {canvas}
                  </S.Card>
                ))}
              </div>
            </div>
          </S.Wrapper>
        )}
        <S.Back>
          <nav>
            <a target="_blank" rel="noreferrer" href={popupData.link}>
              <AiFillGithub />
            </a>
            <AiOutlineClose onClick={clickCloseBtn} />
          </nav>
          <header>
            <h1>{popupData?.title}</h1>
          </header>
          <section>
            <h1>설명</h1>
            <div>
              {popupData?.description.map((value) => (
                <p key={value}>{value}</p>
              ))}
            </div>
          </section>
          <footer>
            <canvas ref={canvasRef} />
          </footer>
        </S.Back>
      </S.Layout>
    </>
  );
};

export default OpenedCube;
