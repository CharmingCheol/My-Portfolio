import { writingsApi } from "../api";
import WritingsServiceImpl from "./writing.service";

jest.mock("../api");

describe("writingService", () => {
  describe("createWriting", () => {
    it("title이 빈 문자열인 경우 바로 리턴한다", () => {
      const mocked = jest.mocked(writingsApi, true);
      const service = new WritingsServiceImpl(mocked);

      const result = service.createWriting({ title: "", content: "content" });

      expect(result).toBeUndefined();
    });
  });
});
