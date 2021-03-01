import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import debounce from "lodash.debounce";
import Component from "./component";
import * as S from "./style";

interface LinkBtnHash {
  color: string;
  index: number;
  link: string;
}

interface Queue {
  color: string;
  index: number;
  time: number;
}

interface HexagonAroundInfo {
  type: "multiply" | "add" | "subtract";
  value: number;
}

// const COLOR_LIST = ["#9DC8C8", "#58C9B9", "#519D9E", "#D1B6E1"];
const NUMBER_OF_HEXAGONS_IN_ONE_LINE = 17;
const MENU_COUNT = 3;
const LINK_BTN_INFO = [
  {
    color: "RGBA(0, 200, 200, 1)",
    link: "profile",
  },
  {
    color: "RGBA(170, 137, 118, 1)",
    link: "project",
  },
  {
    color: "RGBA(50, 65, 88, 1)",
    link: "blog",
  },
];

/**
 * @constant containerRef 육각형을 감싸는 container tag의 ref
 * @constant hexagonListRef 육각형 태그들을 1차원 배열에다가 보관
 * @constant linkBtnHash 다음 페이지로 이통할 육각형 태그의 정보(interface LinkBtnHash)
 * @constant clickedHexagon 클릭한 육각형의 link name
 * @constant visited BFS를 실행할 때 방문여부를 체크하기 위한 1차원 배열
 */
const Container = () => {
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const hexagonListRef = useRef<HTMLDivElement[]>([]);
  const linkBtnHash = useRef<LinkBtnHash[]>([]);
  const [clickedHexagon, setClickedHexagon] = useState("");
  const visited = useRef<number[]>([]);

  // 클릭한 육각형에 대해 bfs 동작
  const runHexagonBFS = useCallback((curNum: number, curColor: string) => {
    const { innerWidth, innerHeight } = window;
    const calcAround = (around: HexagonAroundInfo[]) =>
      around.map((obj) => {
        if (obj.type === "multiply") {
          return obj.value * NUMBER_OF_HEXAGONS_IN_ONE_LINE;
        }
        return obj.value + NUMBER_OF_HEXAGONS_IN_ONE_LINE;
      });

    const queue: Queue[] = [];
    const oddAround = calcAround([
      { type: "multiply", value: -2 },
      { type: "multiply", value: -1 },
      { type: "add", value: NUMBER_OF_HEXAGONS_IN_ONE_LINE * -2 + 1 },
      { type: "add", value: 0 },
      { type: "add", value: 1 },
      { type: "multiply", value: 2 },
    ]);
    const evenAround = calcAround([
      { type: "multiply", value: -2 },
      { type: "add", value: NUMBER_OF_HEXAGONS_IN_ONE_LINE * -2 - 1 },
      { type: "multiply", value: -1 },
      { type: "add", value: -1 },
      { type: "add", value: 0 },
      { type: "multiply", value: 2 },
    ]);

    // 최초 6방향에 대한 정보를 queue에 추가
    for (let i = 0; i < 6; i += 1) {
      const quotient = parseInt(String(curNum / 17), 10);
      const nextIndex = curNum + (quotient % 2 ? oddAround[i] : evenAround[i]);
      if (visited.current[nextIndex]) {
        const { top, left, width, height } = hexagonListRef.current[nextIndex].getBoundingClientRect();
        if (top > 0 && left > 0 && left + width + width / 2 < innerWidth && top + height < innerHeight) {
          const currentHexagon = hexagonListRef.current[nextIndex];
          currentHexagon.classList.add("selected");
          currentHexagon.style.setProperty("--time", `0.1s`);
          currentHexagon.style.setProperty("--color", curColor);
          visited.current[nextIndex] = 0;
          queue.push({ index: nextIndex, time: 0.1, color: curColor });
        }
      }
    }

    // BFS 동작
    while (queue.length) {
      const { index, time, color } = queue.shift() as Queue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extractColor = (color.match(/\((.*?)\)/) as Record<string, any>)[1];
      const [R, G, B, A] = extractColor.split(",");
      const tempList = [];

      // 6방향 탐색
      for (let i = 0; i < 6; i += 1) {
        const quotient = parseInt(String(index / 17), 10);
        const nextIndex = index + (quotient % 2 ? oddAround[i] : evenAround[i]);
        if (visited.current[nextIndex]) {
          const { top, left, width, height } = hexagonListRef.current[nextIndex].getBoundingClientRect();
          if (
            top > 0 &&
            left > 0 &&
            left + width + width / 2 < innerWidth &&
            top + height < innerHeight &&
            A - 0.1 > 0
          ) {
            tempList.push(nextIndex);
          }
        }
      }

      // 갈 수 있는 방향 중에서 한 방향만 선택
      if (tempList.length) {
        const randomIndex = Math.floor(Math.random() * tempList.length);
        const selectOneIndex = tempList[randomIndex];
        const currentHexagon = hexagonListRef.current[selectOneIndex];

        currentHexagon.classList.add("selected");
        currentHexagon.style.setProperty("--time", `${time + 0.1}s`);
        currentHexagon.style.setProperty("--color", `RGBA(${R},${G},${B},${A - 0.02})`);
        visited.current[selectOneIndex] = 0;
        queue.push({ index: selectOneIndex, time: time + 0.1, color: `RGBA(${R},${G},${B},${A - 0.02})` });
      }
    }
  }, []);

  // 임의의 육각형 도형 클릭
  const clickHexagon = useCallback(
    (event: MouseEvent) => {
      if (clickedHexagon) return;
      const retyped = event.target as HTMLElement;
      let currentTag = retyped;

      while (!currentTag.classList.contains("container")) {
        if (currentTag.classList.contains("isClicked")) {
          const linkData = currentTag.getAttribute("data-link");
          const { index, link, color } = linkBtnHash.current.find((value) => value.link === linkData) as LinkBtnHash;
          setClickedHexagon(link);
          runHexagonBFS(index, color);
          break;
        }
        currentTag = currentTag.parentNode as HTMLElement;
      }
    },
    [clickedHexagon, runHexagonBFS],
  );

  // 메뉴가 되는 육각형을 선정
  const selectMenus = useCallback((withinRangeNumber) => {
    const firstValue = withinRangeNumber[0];
    const lastValue = withinRangeNumber[withinRangeNumber.length - 1];
    const shuffleResult: number[] = [];
    while (shuffleResult.length !== MENU_COUNT) {
      const index = Math.floor(Math.random() * (lastValue - firstValue) + firstValue - 1);
      if (withinRangeNumber.includes(index) && !shuffleResult.includes(index)) shuffleResult.push(index);
    }

    for (let i = 0; i < linkBtnHash.current.length; i += 1) {
      const { index } = linkBtnHash.current[i];
      const tag = hexagonListRef.current[index];
      const p = tag.querySelector("p") as HTMLParagraphElement;

      tag.removeChild(p);
      tag.classList.remove("isClicked");
      tag.removeAttribute("data-link");
      tag.style.removeProperty("--color");
    }

    // 랜덤으로 뽑힌 수에 클래스, property 부여
    visited.current = Array(hexagonListRef.current.length).fill(1);
    linkBtnHash.current = [];
    for (let i = 0; i < shuffleResult.length; i += 1) {
      const { color, link } = LINK_BTN_INFO[i];
      const index = shuffleResult[i];
      const tag = hexagonListRef.current[index];
      const p = document.createElement("p");
      p.textContent = link;

      tag.classList.add("isClicked");
      tag.appendChild(p);
      tag.setAttribute("data-link", link);
      tag.style.setProperty("--color", color);
      linkBtnHash.current.push({ index, link, color });
      visited.current[index] = 0;
    }
  }, []);

  // resize
  const resizeContainer = useCallback(
    () =>
      debounce(() => {
        if (!containerRef.current) return;
        const { innerWidth, innerHeight } = window;
        const withinRangeNumber: number[] = [];
        let count = 0;

        // 육각형 태그를 배열에 추가. 화면 범위에 있는 육각형은 인덱스로 배열에 추가
        containerRef.current.childNodes.forEach((section) => {
          section.childNodes.forEach((ul) => {
            ul.childNodes.forEach((li) => {
              const retyped = li as HTMLLIElement;
              const { top, left, width, height } = retyped.getBoundingClientRect();
              if (top > 0 && left > 0 && left + width + width / 2 < innerWidth && top + height < innerHeight) {
                withinRangeNumber.push(count);
              }
              count += 1;
            });
          });
        });
        selectMenus(withinRangeNumber);
      }, 300),
    [selectMenus],
  );

  // debounce를 걸어서 transitionend 이벤트 중복 방지
  const endHexagonTransition = useCallback(() => {
    if (!clickedHexagon) return;
    history.push({
      pathname: clickedHexagon,
    });
  }, [history, clickedHexagon]);

  // 최초 설정
  useEffect(() => {
    if (!containerRef.current) return;
    const { innerWidth, innerHeight } = window;
    const withinRangeNumber: number[] = [];
    let count = 0;

    // 육각형 태그를 배열에 추가. 화면 범위에 있는 육각형은 인덱스로 배열에 추가
    containerRef.current.childNodes.forEach((section) => {
      section.childNodes.forEach((ul) => {
        ul.childNodes.forEach((li) => {
          const retyped = li as HTMLLIElement;
          const { top, left, width, height } = retyped.getBoundingClientRect();
          if (top > 0 && left > 0 && left + width + width / 2 < innerWidth && top + height < innerHeight) {
            withinRangeNumber.push(count);
          }
          count += 1;
          li.childNodes.forEach((div) => {
            hexagonListRef.current.push(div as HTMLDivElement);
          });
        });
      });
    });
    selectMenus(withinRangeNumber);
  }, [selectMenus]);

  // 육각형 태그를 클릭하는 event
  useEffect(() => {
    window.addEventListener("click", clickHexagon);
    return () => window.removeEventListener("click", clickHexagon);
  }, [clickHexagon]);

  // 육각형 transitionend
  useEffect(() => {
    const debounced = debounce(() => endHexagonTransition(), 120);
    window.addEventListener("transitionend", debounced);
    return () => {
      window.removeEventListener("transitionend", debounced);
    };
  }, [endHexagonTransition]);

  // 화면 resize
  useEffect(() => {
    window.addEventListener("resize", resizeContainer());
    return () => window.removeEventListener("resize", resizeContainer());
  }, [resizeContainer]);

  return (
    <>
      <S.Layout>
        <div ref={containerRef} className="container">
          <Component />
        </div>
      </S.Layout>
    </>
  );
};

export default Container;
