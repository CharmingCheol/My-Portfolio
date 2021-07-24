/* eslint-disable prefer-destructuring */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as S from "./style";

interface PixelsState {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  alpha: number;
}

interface ColoredPixelsState {
  x: number;
  y: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
}

// 노랑, 파랑, 초록, 하늘, 주황
const colors = ["#e2e551", "#3969b0", "#20b36b", "#12b4ea", "#ef6e4e"];

const Art3 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixels = useRef<PixelsState[]>([]);
  const coloredPixels = useRef<ColoredPixelsState[]>([]);
  const currentPixel = useRef(0);
  const mousePosition = useMemo(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }), []);

  // init, resize일 때 캔버스 초기화
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const { clientHeight, clientWidth } = canvasRef.current.parentElement as HTMLElement;
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;
    pixels.current = [];
    coloredPixels.current = [];

    // 간격은 10, 가로, 세로 크기가 8인 사각형을 배열에 추가
    for (let y = 0; y < clientHeight / 6; y += 1) {
      for (let x = 0; x < clientWidth / 6; x += 1) {
        pixels.current.push({
          x: x * 6,
          y: y * 6,
          width: 4,
          height: 4,
          color: "#222",
          alpha: 1,
        });
      }
    }

    // 색칠되어 있는 좌표 정보 생성
    for (let i = 0; i < 100; i += 1) {
      coloredPixels.current.push({
        x: clientWidth / 2, // 시작 x좌표(시작값은 정중앙)
        y: clientHeight / 2, // 시작 y좌표(시작값은 정중앙)
        alpha: 0,
        color: colors[i % 5],
        vx: -1 + Math.random() * 2, // 다음 이동 x값의 가중치
        vy: -1 + Math.random() * 2, // 다음 이동 y값의 가중치
      });
    }
  }, [coloredPixels]);

  // grid를 그림
  const drawGrid = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const { clientHeight, clientWidth } = canvasRef.current.parentElement as HTMLElement;
    if (!ctx) return;

    // pixel의 color값을 전부 없앰
    for (let i = 0; i < pixels.current.length; i += 1) pixels.current[i].color = "";

    // 특정 pixel에다가 속성 부여
    for (let i = 0; i < coloredPixels.current.length; i += 1) {
      // coloredPixels의 i번째 인덱스 값을 조합해서 특정 인덱스를 만들고,
      // 그 인덱스를 pixels에 대입해서 color와 alpha 갱신
      const { alpha, color, vx, vy, x, y } = coloredPixels.current[i];
      const nextPixel = Math.floor(y / 10) * (Math.floor(clientWidth / 10) + 1) + Math.floor(x / 10);
      if (nextPixel < pixels.current.length && nextPixel >= 0) {
        pixels.current[nextPixel].color = color;
        pixels.current[nextPixel].alpha = alpha;
      }

      // alpha가 범위 안에 들어있으면 감소시키고, 벗어나면 0으로 초기화
      if (alpha > 0) coloredPixels.current[i].alpha -= 0.008;
      if (alpha < 0) coloredPixels.current[i].alpha = 0;

      // x와 y의 값에다가 가중치 값을 더함
      coloredPixels.current[i].x += vx;
      coloredPixels.current[i].y += vy;
    }

    // 픽셀 그리기
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    for (let i = 0; i < pixels.current.length; i += 1) {
      // 빈 픽셀 그리기
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#222";
      ctx.fillRect(pixels.current[i].x, pixels.current[i].y, pixels.current[i].width, pixels.current[i].height);

      // 컬러 픽셀 그리기(color와 alpha의 값에 해당하는 픽셀 그리기. 없으면 안그려짐)
      ctx.globalAlpha = pixels.current[i].alpha;
      ctx.fillStyle = pixels.current[i].color;
      ctx.fillRect(pixels.current[i].x, pixels.current[i].y, pixels.current[i].width, pixels.current[i].height);
    }
  }, [coloredPixels]);

  const launchPixel = useCallback(() => {
    coloredPixels.current[currentPixel.current].x = mousePosition.x;
    coloredPixels.current[currentPixel.current].y = mousePosition.y;
    coloredPixels.current[currentPixel.current].alpha = 1;

    currentPixel.current += 1;
    if (currentPixel.current > 99) currentPixel.current = 0;
  }, [coloredPixels, mousePosition]);

  // canvas init
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // canvas requestAnimationFrame
  useEffect(() => {
    const draw = () => {
      launchPixel();
      launchPixel();
      drawGrid();
      requestAnimationFrame(draw);
    };
    draw();
  }, [drawGrid, launchPixel]);

  // resize event
  useEffect(() => {
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // mouse event
  useEffect(() => {
    if (!canvasRef.current) return;
    const mousemove = (e: MouseEvent) => {
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    };
    canvasRef.current.addEventListener("mousemove", mousemove);
  }, [mousePosition]);

  return (
    <>
      <S.Layout>
        <canvas ref={canvasRef} />
      </S.Layout>
    </>
  );
};

export default Art3;
