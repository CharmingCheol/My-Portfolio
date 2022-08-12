import { writingsApi } from "../api";
import WritingsServiceImpl from "./writing.service";

jest.mock("../api");

describe("writingService", () => {
  let service: WritingsServiceImpl;

  beforeEach(() => {
    const mocked = jest.mocked(writingsApi, true);
    service = new WritingsServiceImpl(mocked);
  });

  describe("createWriting", () => {
    it("title이 빈 문자열인 경우 바로 리턴한다", () => {
      const result = service.createWriting({ title: "", content: "content" });
      expect(result).toBeUndefined();
    });

    it("content가 빈 문자열인 경우 바로 리턴한다", () => {
      const result = service.createWriting({ title: "title", content: "" });
      expect(result).toBeUndefined();
    });

    it("title이 공백으로 되어 있을 경우 바로 리턴한다", () => {
      const result = service.createWriting({ title: "   ", content: "content" });
      expect(result).toBeUndefined();
    });

    it("content가 공백으로 되어 있을 경우 바로 리턴한다", () => {
      const result = service.createWriting({ title: "title", content: "   " });
      expect(result).toBeUndefined();
    });
  });
});
