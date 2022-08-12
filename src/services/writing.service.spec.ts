import { baseWritingsApi } from "api";
import { WritingsApi } from "api/writings";
import { WritingRequestBody } from "types/writing";

import BaseWritingsService, { WritingsService } from "./writing.service";

jest.mock("api");

describe("writingService", () => {
  let mockedApi: jest.MockedObjectDeep<WritingsApi>;
  let service: WritingsService;

  beforeEach(() => {
    mockedApi = jest.mocked(baseWritingsApi, true);
    service = new BaseWritingsService(mockedApi);
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

    it("title과 content에 이상이 없을 경우 게시글 생성 API를 호출 한다", () => {
      const data: WritingRequestBody = { title: "title", content: "content" };
      service.createWriting(data);
      expect(mockedApi.create).toHaveBeenCalledWith(data);
    });
  });
});
