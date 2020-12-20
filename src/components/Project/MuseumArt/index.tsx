import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Factory from "./factory";
import * as S from "./style";

const patriclesNum = 500;
const colors = ["#f35d4f", "#f36849", "#c0d988", "#6ddaf1", "#f1e85b"];

const MuseumArt = () => {
  const particles: Factory[] = useMemo(() => [], []);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationId = useRef(0);

  // 캔버스 draw
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current || !canvasWrapperRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const { clientHeight: height, clientWidth: width } = canvasWrapperRef.current;
    let factor = 1;

    // 캔버스 초기화
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";

    for (let i = 0; i < patriclesNum; i += 1) {
      const temp = particles[i];

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
      if (temp.x > width) temp.x = 0;
      if (temp.x < 0) temp.x = width;
      if (temp.y > height) temp.y = 0;
      if (temp.y < 0) temp.y = height;
    }
  }, [particles]);

  // 배열에다가 Factory 클래스 추가
  useEffect(() => {
    if (!canvasWrapperRef.current) return;
    const { clientHeight, clientWidth } = canvasWrapperRef.current;
    for (let i = 0; i < patriclesNum; i += 1) {
      particles.push(new Factory({ width: clientWidth, height: clientHeight, colors }));
    }
  }, [particles]);

  // requestAnimationFrame
  useEffect(() => {
    function loop() {
      drawCanvas();
      animationId.current = requestAnimationFrame(loop);
    }
    animationId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId.current);
  }, [drawCanvas]);

  return (
    <>
      <S.Layout>
        <div className="art art-front" ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </div>
        <div className="art art-back" />
        <div className="art art-left" />
        <div className="art art-top" />
        <div className="art art-bottom" />
      </S.Layout>
    </>
  );
};

export default MuseumArt;
