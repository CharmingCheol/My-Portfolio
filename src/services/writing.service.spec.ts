import { AxiosError } from "axios";

import { baseWritingsApi } from "api";
import { Writing, WritingRequestBody } from "types/writing";

import BaseWritingsService, { WritingsService } from "./writing.service";

jest.mock("api");

describe("writingService", () => {
  let mockedApi: jest.MockedObjectDeep<typeof baseWritingsApi>;
  let service: WritingsService;

  beforeEach(() => {
    mockedApi = jest.mocked(baseWritingsApi, true);
    service = new BaseWritingsService(mockedApi);
  });

  describe("createWriting", () => {
    it("title이 빈 문자열인 경우 바로 리턴한다", async () => {
      const result = await service.createWriting({ title: "", content: "content" });
      expect(result).toBeUndefined();
    });

    it("content가 빈 문자열인 경우 바로 리턴한다", async () => {
      const result = await service.createWriting({ title: "title", content: "" });
      expect(result).toBeUndefined();
    });

    it("title이 공백으로 되어 있을 경우 바로 리턴한다", async () => {
      const result = await service.createWriting({ title: "   ", content: "content" });
      expect(result).toBeUndefined();
    });

    it("content가 공백으로 되어 있을 경우 바로 리턴한다", async () => {
      const result = await service.createWriting({ title: "title", content: "   " });
      expect(result).toBeUndefined();
    });

    it("title과 content에 이상이 없을 경우 게시글 생성 API를 호출 한다", async () => {
      const data: WritingRequestBody = { title: "title", content: "content" };
      await service.createWriting(data);
      expect(mockedApi.create).toHaveBeenCalledWith(data);
    });

    it("게시글 생성 API가 성공할 경우 결과값을 반환한다", async () => {
      const { title, content }: WritingRequestBody = { title: "title", content: "content" };
      const writing: Writing = { title, content, createdAt: new Date().toString(), id: "id" };
      mockedApi.create.mockResolvedValue(writing);

      const response = await service.createWriting({ title, content });
      expect(response).toStrictEqual(writing);
    });

    it("error response가 없을 경우 에러 그 자체를 반환 한다", async () => {
      const axiosError: AxiosError = {
        config: {},
        isAxiosError: false,
        toJSON: () => ({}),
        name: "",
        message: "",
      };
      mockedApi.create.mockRejectedValue(axiosError);

      const response = await service.createWriting({ title: "title", content: "content" });
      expect(response).toStrictEqual(axiosError);
    });
  });
});
