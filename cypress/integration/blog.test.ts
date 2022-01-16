describe("블로그 페이지", () => {
  // 헤더
  it("/blog 페이지에서 헤더가 출력된다", () => {
    cy.visit("/blog");
    cy.get("header");
  });

  it("헤더에서 로고를 클릭 할 경우, /으로 이동한다", () => {
    cy.visit("/blog");
    cy.get("a").should("have.attr", "href", "/");
    cy.url().should("include", "/");
  });

  it("헤더에서 Me를 클릭하면, /me으로 이동한다", () => {
    cy.visit("/blog");
    cy.contains("Me").click();
    cy.url().should("include", "/me");
  });

  it("헤더에서 Project를 클릭하면, /project로 이동한다", () => {
    cy.visit("/blog");
    cy.contains("Project").click();
    cy.url().should("include", "/project");
  });

  it("viewport의 크기가 작아질 경우, 헴버거 버튼이 출력된다", () => {
    cy.visit("/blog");
    cy.viewport(500, 500);
    cy.get(".hamburger");
  });

  it("햄버거 버튼을 클릭 할 경우, 메뉴가 출력되고 닫기 버튼으로 변경된다", () => {
    cy.visit("/blog");
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.get(".showed");
    cy.get(".close");
  });

  it("햄버거 버튼 클릭 후 메뉴에서 Me를 클릭 할 경우, /me으로 이동한다", () => {
    cy.visit("/blog");
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.contains("Me").click();
    cy.url().should("include", "/me");
  });

  it("햄버거 버튼 클릭 후 메뉴에서 About를 클릭 할 경우, /me으로 이동한다", () => {
    cy.visit("/blog");
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.contains("Project").click();
    cy.url().should("include", "/project");
  });

  it("닫기 버튼을 클릭 할 경우, 메뉴가 사라지고 햄버거 버튼으로 변경된다", () => {
    cy.visit("/blog");
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.get(".close").click();
    cy.get(".hamburger");
    cy.get(".showed").should("not.exist");
  });

  // pagination
  // it("블로그 페이지에서 최초 pagination 번호는 1번이다", () => {
  //   cy.visit("/blog");
  //   cy.contains("1").should("have.color", palette.white_20);
  //   cy.contains("2").should("have.color", palette.black_20);
  //   cy.contains("3").should("have.color", palette.black_20);
  // });  // 굳이 테스트를?

  // it("블로그 페이지에서 pagination 번호는 5개씩 보여준다", () => {}); // 굳이 테스트를?

  // it("게시글 API 호출 도중 400 status를 반환 받을 경우, ", () => {});

  // it("게시글 API 호출 도중 500 status를 반환 받을 경우, ", () => {});

  // it("게시글 API 호출 도중 일정 timeout을 초과 할 경우, ", () => {});

  // it("최초에 pagination 1번 페이지 게시글 리스트 API를 호출한다", () => {});

  // it("pagination 숫자를 클릭 할 경우, 클릭한 숫자 페이지 게시글 리스트 API를 호출한다", () => {});

  // it("pagination <<을 클릭 할 경우, 1번 페이지 게시글 리스트 API를 호출한다", () => {});

  // it("pagination <을 클릭 할 경우, 이전 페이지 게시글 리스트 API를 호출한다", () => {});

  // it("pagination >을 클릭 할 경우, 다음 페이지 게시글 리스트 API를 호출한다", () => {});

  // it("pagination >>을 클릭 할 경우, 마지막 페이지 게시글 리스트 API를 호출한다", () => {});

  // // 카드
  // it("카드를 클릭 할 경우, 게시글 상세 페이지로 이동한다(쿼리스트링으로 id 전달)", () => {});
});
