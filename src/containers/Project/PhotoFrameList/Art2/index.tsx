import React, { useCallback, useEffect, useRef } from "react";
import Factory from "./Factory";

const COLORS = ["#b56e80", "#ffc3d3", "#fbe4b8", "#c0ecf7", "#78a6b3"];
const clickCount = 0;

const Art2 = () => {
  // const particles: Factory[] = useMemo(() => [], []);
  const particles = useRef<Factory[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animationId = useRef(0);

  // 화면 터치
  // const onTouchMove = useCallback((e: TouchEvent) => {
  //   if (e.touches.length > 0) {
  //     mouse.current.x = e.touches[0].clientX;
  //     mouse.current.y = e.touches[0].clientY;
  //   }
  // }, []);

  // // 화면 터치 종료
  // const onTouchEnd = useCallback(() => {
  //   mouse.current.x = -9999;
  //   mouse.current.y = -9999;
  // }, []);

  // // 마우스 클릭 이벤트
  // const onMouseClick = useCallback(() => {
  //   clickCount += 1;
  //   if (clickCount === 4) clickCount = 0;
  // }, []);

  // // 마우스 이동 이벤트
  // const onMouseMove = useCallback((e: MouseEvent) => {
  //   mouse.current.x = e.clientX;
  //   mouse.current.y = e.clientY;
  // }, []);

  // 최초 캔버스 draw, resize 되었을 때
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { clientHeight, clientWidth } = canvasRef.current.parentElement as HTMLElement;
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    const ww = canvasRef.current.width;
    const wh = canvasRef.current.height;
    ctx.clearRect(0, 0, ww, wh);

    // font, 어떤 위치에 글자를 추가할지 적용
    ctx.font = `bold ${ww / 3}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ㅊㅁㅊ", ww / 2, wh / 2);

    // getImageData을 통해 지정된 캔버스 화소 데이터를 복사. 이후 텍스트를 캔버스에서 clear
    const { data } = ctx.getImageData(0, 0, ww, wh);
    ctx.clearRect(0, 0, ww, wh);
    ctx.globalCompositeOperation = "screen";
    particles.current = [];

    // 텍스트가 있었던 부분에 대해 rgba 값을 탐색
    // 단, 양이 너무 많기 때문에 4, 8, 12같은 4의 배수로 next index를 설정
    for (let i = 0; i < ww; i += 8) {
      for (let j = 0; j < wh; j += 8) {
        // 2차원 배열을 1차원 배열로 나열했기 때문에 ww만큼 점프해서 값 확인
        // data[0] = r, data[1] = g, data[2] = b, data[3] = a이기 때문에 4만큼 배수를 함
        if (data[(i + j * ww) * 4 + 3]) {
          particles.current.push(new Factory({ ww: i, wh: j, colors: COLORS }));
        }
      }
    }
  }, []);

  // canvas 초기값 설정
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // 캔버스 animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const ww = canvasRef.current.clientWidth;
    const wh = canvasRef.current.clientHeight;

    function animate() {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, ww, wh);
      for (let i = 0; i < particles.current.length; i += 1) {
        particles.current[i].render(ctx, mouse.current, clickCount);
      }
      animationId.current = requestAnimationFrame(animate);
    }

    animationId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId.current);
  }, [particles]);

  // resize event
  useEffect(() => {
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // mousemove
  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   canvasRef.current.addEventListener("mousemove", onMouseMove);
  // }, [onMouseMove]);

  // // click
  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   canvasRef.current.addEventListener("click", onMouseClick);
  // }, [onMouseClick]);

  // // touchmove
  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   canvasRef.current.addEventListener("touchmove", onTouchMove);
  // }, [onTouchMove]);

  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   canvasRef.current.addEventListener("touchend", onTouchEnd);
  // }, [onTouchEnd]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default Art2;
