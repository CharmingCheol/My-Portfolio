import dotenv from "dotenv";
import fnGetMainLayoutPage from "./index";

dotenv.config();

describe("utils/fnSetEncryptDecrypt", () => {
  it("portfolio 페이지를 전달할 경우, false를 반환한다", () => {
    const portfolio = fnGetMainLayoutPage("/portfolio");
    const me = fnGetMainLayoutPage("/portfolio/me");
    const project = fnGetMainLayoutPage("/portfolio/project");
    expect(portfolio).toBe(false);
    expect(me).toBe(false);
    expect(project).toBe(false);
  });

  it("글 작성 페이지를 전달할 경우, false를 반환한다", () => {
    const write = fnGetMainLayoutPage(process.env.WRITE_PAGE as string);
    expect(write).toBe(false);
  });

  it("이 외에 페이지를 전달할 경우, true를 반환한다", () => {
    const blog = fnGetMainLayoutPage("/");
    const writing = fnGetMainLayoutPage("/writing/1");
    expect(blog).toBe(true);
    expect(writing).toBe(true);
  });
});