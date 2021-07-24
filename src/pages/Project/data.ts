const projectData = [
  {
    name: "first-art",
    payload: {
      title: "My Portfolio",
      date: "2021.07~2020.07",
      team: "team",
      description: [
        "저의 포트폴리오를 사이트로 만든 프로젝트입니다.",
        "인터렉티브한 요소들을 배치시켜서 특별한 포트폴리오를 만드려고 했습니다.",
        "이후 블로그 기능까지 적용하는 것을 목표로 하고 있습니다.",
      ],
      tech: ["Typescript", "React", "Webpack", "Styled-Component"],
      link: "https://github.com/CharmingCheol/My-Portfolio",
    },
  },
  {
    name: "second-art",
    payload: {
      title: "Bezier Curve Editor",
      date: "2021.06~2021.08",
      team: "individual",
      description: [
        "랜더링의 주도권은 React, 연산은 D3가 담당하도록 하였습니다.",
        "observer 패턴을 활용해서 keyframe, curve의 이동을 제어했습니다.",
        "bezeir handle을 드래그하여 상세한 애니메이션 모션 데이터를 조절하도록 하였습니다.",
      ],
      tech: ["Typescript", "React", "Redux", "D3"],
      link: "https://github.com/CharmingCheol/curve-editor-pratice",
    },
  },
  {
    name: "third-art",
    payload: {
      title: "Where Are you",
      date: "2020.12~2021.1",
      team: "team",
      description: [
        "한국판 스택 오버 플로우와 개발자 팀원 모집을 조합한 사이트입니다.",
        "프로젝트에서 프론트 리딩 역할을 담당하였습니다.",
        "빌드 환경, 깃허브 전략, 코드 리뷰 등을 직접 구축해서 진행하였습니다.",
        "담당 영역으로 마크다운 에디터, 로그인, 유저 페이지를 개발하였습니다.",
      ],
      tech: ["Typescript", "React", "Storybook", "Webpack"],
      link: "https://github.com/Double-Slash/5th-final-team1-web",
    },
  },
];

export default projectData;
