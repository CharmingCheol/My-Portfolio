import { AxiosInstance } from "axios";
import { Writing, WritingRequestBody } from "types/writing";

import WritingsApi from "./writings";
import { apiOptions } from "./index";

const mockFactory = {
  get: jest.fn((entity) => entity),
  post: jest.fn((entity) => entity),
  patch: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
};

describe("WritingsApi", () => {
  const BASE_URL = "/writings";
  let writingsApi: WritingsApi;

  beforeEach(() => {
    const apiOptionsMock = jest.mocked(apiOptions, true);
    const baseAxios = (mockFactory as unknown) as AxiosInstance;
    writingsApi = new WritingsApi(baseAxios, apiOptionsMock);
  });

  describe("findOne", () => {
    const id = "id";

    it("전달 된 id가 API 주소에 포함 된다", async () => {
      await writingsApi.findOne(id);
      expect(mockFactory.get).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const writing: Writing = {
        createdAt: new Date().toString(),
        id: "id",
        content: "content",
        title: "title",
      };
      mockFactory.get.mockReturnValue({ data: writing });
      const response = await writingsApi.findOne(id);
      expect(response).toStrictEqual(writing);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.get.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await writingsApi.findOne(id);
      }).rejects.toThrowError(error);
    });
  });

  describe("pagination", () => {
    const page = 1;

    it("API 호출 시 page 파라미터가 쿼리스트링으로 추가 된다", async () => {
      await writingsApi.pagination(page);
      expect(mockFactory.get).toHaveBeenCalledWith(`${BASE_URL}`, { params: { page } });
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const totalCount = 10;
      const writings = Array(totalCount)
        .fill(0)
        .map<Writing>(() => ({
          createdAt: new Date().toString(),
          id: "id",
          content: "content",
          title: "title",
        }));
      mockFactory.get.mockReturnValue({ data: { totalCount, writings } });
      const response = await writingsApi.pagination(page);
      expect(response).toStrictEqual({ totalCount, writings });
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.get.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await writingsApi.pagination(page);
      }).rejects.toThrowError(error);
    });
  });

  describe("create", () => {
    const body: WritingRequestBody = { title: "title", content: "content" };

    it("API 호출 시 body로 전달 할 데이터도 같이 전달 된다", async () => {
      await writingsApi.create({ title: "title", content: "content" });
      expect(mockFactory.post).toHaveBeenCalledWith(`${BASE_URL}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const writing: Writing = {
        createdAt: new Date().toString(),
        id: "id",
        content: "content",
        title: "title",
      };
      mockFactory.post.mockReturnValue({ data: writing });
      const response = await writingsApi.create(writing);
      expect(response).toStrictEqual(writing);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.post.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await writingsApi.create(body);
      }).rejects.toThrowError(error);
    });
  });

  describe("update", () => {
    const body: WritingRequestBody = { title: "title", content: "content" };
    const id = "id";

    it("API 호출 시 body와 id도 같이 전달 된다", async () => {
      await writingsApi.update(body, id);
      expect(mockFactory.patch).toHaveBeenCalledWith(`${BASE_URL}/${id}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const writing: Writing = {
        createdAt: new Date().toString(),
        id: "id",
        content: "content",
        title: "title",
      };
      mockFactory.patch.mockReturnValue({ data: writing });
      const response = await writingsApi.update(body, id);
      expect(response).toStrictEqual(writing);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.patch.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await writingsApi.update(body, id);
      }).rejects.toThrowError(error);
    });
  });

  describe("delete", () => {
    const id = "id";

    it("API 호출 시 id가 URL에 포함 된다", async () => {
      await writingsApi.delete(id);
      expect(mockFactory.delete).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      mockFactory.delete.mockReturnValue({ data: null });
      const response = await writingsApi.delete(id);
      expect(response).toBeNull();
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", () => {
      const error = new Error("에러가 발생했습니다");
      mockFactory.delete.mockRejectedValueOnce(Promise.reject(error));
      expect(async () => {
        await writingsApi.delete(id);
      }).rejects.toThrowError(error);
    });
  });
});
