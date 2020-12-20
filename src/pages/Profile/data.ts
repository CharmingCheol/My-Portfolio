import { BackgroundColor } from "./type";

export const vinylRecords = {
  keyword: {
    title: "keyword",
    list: ["차민철", "26살", "인천시 계양구", "인하대학교 소프트웨어융합공학과", "넥슨 네트웍스 QA팀"],
  },
  skills: {
    title: "skills",
    list: ["JAVASCRIPT", "TYPESCRIPT", "REACT", "VUE", "NEXT", "WEBPACK"],
  },
  resume: {
    name: "차민철",
    birth: "1996.08.06",
    skills: [
      "HTML",
      "CSS",
      "javascript",
      "typescript",
      "React",
      "Vue",
      "Next.js",
      "Redux",
      "PWA",
      "Socket.io",
      "Webpack",
      "Eslint",
      "Storybook",
    ],
    careerSummary: [
      {
        company: "넥슨 네트웍스",
        department: "QA 팀",
        period: "2014.11~2019.06",
      },
    ],
    education: [
      {
        school: "인하대학교",
        major: "소프트웨어융합공학과",
        period: "2019.03~현재",
      },
    ],
    careerDetail: [
      {
        title: "Need For Speed 클로즈 베타 및 오픈 베타 QA",
        period: "2016.01~2017.04",
        description: [
          "여러번의 클로즈 베타와 오픈 베타를 리딩하고 역할 분배.",
          "지라에 존재하는 버그 리포트들을 관리하고 유관부서에 공유하는 리딩 역할 수행.",
          "사업, 디자인, 개발, 운영 등 다양한 부서와 함께 하는 정기 회의에서 QA 측으로 참석.",
        ],
      },
      {
        title: "피파온라인3 엔진 업데이트 QA",
        period: "2015.08~2015.10",
        description: [
          "선수 모션, 속력 및 슈팅 세기 비교 등 수백개의 예외사항 test case를 만들고 테스트 진행.",
          "유니폼 앰블럼, 페이스온과 같은 사소한 UI부분도 독자적으로 테스트 진행.",
          "대규모 업데이트 패치 후에도, 핫픽스 패치에 신속하게 대응하여 문제점 해결에 기여.",
        ],
      },
    ],
  },
};

export const palatte: BackgroundColor = {
  keyword: "#0ac4c1",
  skills: "#2cc3f8",
  resume: "#fbbc28",
};
