import React, { useCallback, useEffect, useRef } from "react";
import Factory from "./factory";
import * as S from "./style";

const patriclesNum = 100;
const colors = ["#f35d4f", "#f36849", "#c0d988", "#6ddaf1", "#f1e85b"];

const Art1 = () => {
  const particles = useRef<Factory[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationId = useRef(0);

  // init, resize일 때 캔버스 초기화
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const { clientHeight, clientWidth } = canvasRef.current.parentElement as HTMLElement;
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;
    for (let i = 0; i < patriclesNum; i += 1) {
      particles.current.push(new Factory({ width: clientWidth, height: clientHeight, colors }));
    }
  }, [particles]);

  // 캔버스 draw
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const { clientHeight, clientWidth } = canvasRef.current.parentElement as HTMLElement;
    let factor = 1;

    // 캔버스 초기화
    context.clearRect(0, 0, clientWidth, clientHeight);
    context.globalCompositeOperation = "lighter";

    for (let i = 0; i < patriclesNum; i += 1) {
      const temp = particles.current[i];

      // 도형의 테두리, 내부 색상
      context.fillStyle = temp.rgba;
      context.strokeStyle = temp.rgba;

      // 원점 부분
      context.beginPath();
      context.arc(temp.x, temp.y, temp.radius * factor, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();

      // 원의 테두리 부분
      context.beginPath();
      context.arc(temp.x, temp.y, (temp.radius + 5) * factor, 0, Math.PI * 2, true);
      context.stroke();
      context.closePath();

      // 위치 변동
      temp.x += temp.vx;
      temp.y += temp.vy;
      factor += 0.002;

      // 제한 범위를 벗어날 경우 위치 초기화
      if (temp.x > clientWidth) temp.x = 0;
      if (temp.x < 0) temp.x = clientWidth;
      if (temp.y > clientHeight) temp.y = 0;
      if (temp.y < 0) temp.y = clientHeight;
    }
  }, [particles]);

  // 캔버스 초기화
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // requestAnimationFrame
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

  return (
    <>
      <S.Layout ref={canvasRef} />
    </>
  );
};

export default Art1;
