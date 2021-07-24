import React, { useCallback, useState } from "react";
import * as S from "./index.style";

interface Props {
  isFirstUL: boolean;
}

interface HexagonQueue {
  color: string;
  hexagonIndex: number;
  transitionTime: number;
}

const Hexagon = (props: Props) => {
  const { isFirstUL } = props;
  const [clickedHexagon, setClickedHexagon] = useState(false);

  // 육각형 클릭
  const handleClickHexagon = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { innerWidth, innerHeight } = window;
      const { className } = event.currentTarget;
      if (className === "picked") {
        const allHexagon = document.querySelectorAll("li>div");
        const currentHexagon = event.currentTarget;
        const currentIndex = parseInt(currentHexagon.getAttribute("data-index") as string, 10);
        const currentColor = currentHexagon.style.getPropertyValue("--color");
        const name = currentHexagon.firstChild?.textContent;
        setClickedHexagon(true);

        // 클릭한 육각형 주변 6개의 육각형 index 탐색
        const getAroundHexagonsIndex = (index: number, isFirst: boolean) => {
          if (isFirst) return [index + 18, index + 54, index + 36, index + 53, index + 17, index - 36];
          return [index - 53, index - 17, index + 36, index - 18, index - 54, index - 36];
        };
        const aroundIndcies = getAroundHexagonsIndex(currentIndex, isFirstUL);

        // 클릭한 육각형 주변으로 6개 육각형에 property 적용
        const queue: HexagonQueue[] = [];
        for (let index = 0; index < aroundIndcies.length; index += 1) {
          const aroundIndex = aroundIndcies[index];
          const aroundHexagon = allHexagon[aroundIndex] as HTMLDivElement;
          aroundHexagon.classList.add("picked");
          aroundHexagon.style.setProperty("--color", currentColor);
          aroundHexagon.style.setProperty("--time", `0.1s`);
          queue.push({ color: currentColor, hexagonIndex: aroundIndex, transitionTime: 0.1 });
        }

        // BFS
        while (queue.length) {
          const { color, hexagonIndex, transitionTime } = queue.shift() as HexagonQueue;
          const regExpColor = (color.match(/\((.*?)\)/) as Record<string, any>)[1];
          const [R, B, G, A] = regExpColor.split(",");
          const quotient = parseInt(String(hexagonIndex / 18), 10);
          const nextIndices = getAroundHexagonsIndex(hexagonIndex, !(quotient % 2));
          const applicants: number[] = [];

          // 6방향 탐색
          for (let index = 0; index < nextIndices.length; index += 1) {
            const nextIndex = nextIndices[index];
            if (nextIndex >= 0) {
              const { top, left, width, height } = allHexagon[nextIndex].getBoundingClientRect();
              const hexagon = allHexagon[nextIndex];
              if (
                top > 0 &&
                left > 0 &&
                left + width + width / 2 < innerWidth &&
                top + height < innerHeight &&
                A - 0.1 > 0 &&
                !hexagon.classList.contains("picked")
              ) {
                applicants.push(nextIndex);
              }
            }
          }

          // 갈 수 있는 방향 중에서 한 방향만 선택
          if (applicants.length) {
            const randomIndex = Math.floor(Math.random() * applicants.length);
            const pickedIndex = applicants[randomIndex];
            const hexagon = allHexagon[pickedIndex] as HTMLDivElement;
            hexagon.classList.add("picked");
            hexagon.style.setProperty("--time", `${transitionTime + 0.1}s`);
            hexagon.style.setProperty("--color", `RGBA(${R},${G},${B},${A - 0.02})`);
            hexagon.setAttribute("data-name", name as string);
            queue.push({
              hexagonIndex: pickedIndex,
              transitionTime: transitionTime + 0.1,
              color: `RGBA(${R},${G},${B},${A - 0.02})`,
            });
          }
        }
      }
    },
    [isFirstUL],
  );

  return (
    <>
      <S.Hexagon>
        <div aria-hidden="true" onClick={handleClickHexagon} />
      </S.Hexagon>
      {clickedHexagon && <S.TransparentWall />}
    </>
  );
};

export default Hexagon;
