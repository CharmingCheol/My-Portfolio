import React from "react";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import Button from "@components/atoms/Button";
import * as S from "./index.style";

const Me = () => {
  return (
    <main>
      <S.FirstArticle>
        <section className="left-section">
          <h1>
            <span className="main-title">Frontend Developer</span>
            <p>안녕하세요. 기본과 원리를 바탕으로 새로운 것에 도전하는</p>
            <p>개발자 차민철입니다.</p>
          </h1>
          <div>
            <Button href="https://github.com/CharmingCheol" icon={<AiFillGithub />} newTab color="sub1" />
            <Button href="mailto:toby0806@gmail.com" icon={<AiOutlineGoogle />} color="sub1" />
          </div>
        </section>
        <section className="right-section">
          <div>thumbnail</div>
        </section>
      </S.FirstArticle>
      <S.SecondArticle>
        <section>
          <h2>업무 가치관</h2>
          <div>
            <h3>1.지각과 근태를 절대로 소홀히 하지 않습니다</h3>
            <p>모든 일의 시작점은 시간 관리와 근태라고 생각합니다.</p>
          </div>
          <div>
            <h3>2.간결하되 구체적으로 도움을 요청합니다</h3>
            <p>
              문제점에 부딪혔을 때 바로 질문하기 보다, 어떤 시도들을 했었고 각각의 결과들을 간결하지만 구체적인 근거를
              두며 질문합니다.
            </p>
          </div>
          <div>
            <h3>3.한계를 두지 않습니다</h3>
            <p>
              어렵거나 처음 겪는 일을 하게 될 때, 제 자신의 한계를 두지 않고 반드시 해낼 수 있다는 마음으로 임합니다.
            </p>
          </div>
          <div>
            <h3>4.~같습니다. 보다는 ~입니다로 말을 마무리 짓습니다</h3>
            <p>
              말의 신뢰를 높이기 위해 ~입니다로 마무리 짓습니다. 말의 신뢰가 없다면, 그 누구도 저를 믿지 않을 것입니다.
            </p>
          </div>
          <div>
            <h3>5.항상 기록합니다</h3>
            <p>
              메모를 하는 도중에 예상치 못한 아이디어가 떠오를 수 있습니다. 그리고 다음에 똑같은 질문을 하지 않도록
              예방합니다.
            </p>
          </div>
          <div>
            <h3>6.팀워크를 중요시 여깁니다</h3>
            <p>
              스포츠에서는 간혹 판타지스타가 경기 결과를 뒤집습니다. 하지만 우승하는 팀은 가장 단단한 조직력을 가진
              팀입니다.
            </p>
          </div>
        </section>
        <section>
          <h2>개발 가치관</h2>
          <div>
            <h3>1.기본기를 중요시 여깁니다</h3>
            <p>
              모든 일에는 기본과 원리가 있습니다. 이를 견고하게 다지지 않고 새로운 것들을 계속해서 쌓아 올린다면, 시간이
              지나 언젠가 무게지게 되어 있습니다. 자바스크립트, 브라우저, 컴퓨터 지식 등 기본기를 다지기 위해 많은
              노력을 하고 있습니다.
            </p>
          </div>
          <div>
            <h3>2.설계에 문제가 없다고 판단이 들기 전까지 코드를 작성하지 않습니다</h3>
            <p>
              충분히 만족 할 만큼 설계가 나오지 않는다면 섣부르게 코드를 작성하지 않습니다. 계획없이 코드를 작성하다가
              문제에 부딪힌다면, 오히려 문제점을 해결하는데 많은 시간을 소요하게 됩니다. 기본적인 동작과 다른 요소들에
              미치는 효과 등을 설계하고, 이를 바탕으로 코드를 작성합니다.
            </p>
          </div>
          <div>
            <h3>3.코드를 작성하면서 매 순간 가독성을 고려합니다</h3>
            <p>
              코드를 작성하는 순간에도 확실한 네이밍으로 작성했는지, 읽기 좋은 구조로 코드를 배치했는지 등을 항상
              고려합니다. 다른 분들이 봤을 때 이해되지 않는 로직이거나, 생각을 하게 만드는 변수명이라면 좋은 코드가
              아니라고 생각합니다.
            </p>
          </div>
          <div>
            <h3>4.개선사항이 생기면, 미루지 않고 바로 리팩토링을 합니다</h3>
            <p>ㅇ</p>
          </div>
          <div>
            <h3>5.코드 리뷰 시, 개선 방안들을 제안하면서 문제점을 뒷받침합니다</h3>
            <p>ㅇ</p>
          </div>
          <div>
            <h3>6.기획자, 디자이너분과 끈임없는 소통을 즐깁니다</h3>
            <p>ㅇ</p>
          </div>
        </section>
      </S.SecondArticle>
      <S.ThirdArticle>
        <h2>Tech Stack</h2>
        <section>
          <li>
            <div />
          </li>
          <li>
            <div />
          </li>
          <li>
            <div />
          </li>
          <li>
            <div />
          </li>
          <li>
            <div />
          </li>
          <li>
            <div />
          </li>
        </section>
      </S.ThirdArticle>
    </main>
  );
};

export default Me;
