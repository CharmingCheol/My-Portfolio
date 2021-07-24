import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import debounce from "lodash.debounce";
import { fnPickedAtRandom } from "utils";
import Hexagon from "./Hexagon/index";
import * as S from "./style";

const SECTION_COUNT = 18;
const LIST_COUNT = 18;

const MENU_DATA = [
  {
    color: "RGBA(0, 200, 200, 1)",
    name: "me",
  },
  {
    color: "RGBA(170, 137, 118, 1)",
    name: "project",
  },
];

const Container = () => {
  const history = useHistory();

  // 브라우저 내에 있는 육각형 중에서 메뉴 선정
  useEffect(() => {
    // 브라우저 범위 내에 있는 육각형 탐색
    const allHexagon = document.querySelectorAll("li>div");
    const getRangedHexagonsIndex = () => {
      const { innerHeight, innerWidth } = window;
      const rangedList: number[] = [];
      let rangedCount = 0;
      allHexagon.forEach((element) => {
        const { top, left, width, height } = element.getBoundingClientRect();
        if (top > 0 && left > 0 && left + width + width / 2 < innerWidth && top + height < innerHeight) {
          rangedList.push(rangedCount);
        }
        rangedCount += 1;
      });
      return rangedList;
    };

    // 범위 내에 있는 육각형에서 메뉴를 랜덤 선정
    const pickedList = fnPickedAtRandom({
      count: MENU_DATA.length,
      list: getRangedHexagonsIndex(),
    });
    for (let index = 0; index < MENU_DATA.length; index += 1) {
      const { color, name } = MENU_DATA[index];
      const hexagonIndex = pickedList[index];
      const hexagon = allHexagon[hexagonIndex] as HTMLDivElement;

      const span = document.createElement("span");
      span.textContent = name;
      hexagon.classList.add("picked");
      hexagon.appendChild(span);
      hexagon.style.setProperty("--color", color);
      hexagon.setAttribute("data-index", hexagonIndex);
    }
  }, []);

  // 메뉴 클릭 transition 종료 시, 다음 페이지로 이동
  useEffect(() => {
    const callback = debounce((event) => {
      const name = event.target.getAttribute("data-name");
      history.push({ pathname: name });
    }, 150);
    window.addEventListener("transitionend", callback);
    return () => window.removeEventListener("transitionend", callback);
  }, [history]);

  return (
    <>
      <S.Layout>
        {Array(SECTION_COUNT)
          .fill(0)
          .map((_, index) => index)
          .map((sectionIndex) => (
            <section key={sectionIndex}>
              <ul className="first">
                {Array(LIST_COUNT)
                  .fill(0)
                  .map((_, index) => index)
                  .map((listIndex) => (
                    <Hexagon key={listIndex} isFirstUL />
                  ))}
              </ul>
              <ul className="second">
                {Array(LIST_COUNT)
                  .fill(0)
                  .map((_, index) => index)
                  .map((listIndex) => (
                    <Hexagon key={listIndex} isFirstUL={false} />
                  ))}
              </ul>
            </section>
          ))}
      </S.Layout>
    </>
  );
};

export default Container;
