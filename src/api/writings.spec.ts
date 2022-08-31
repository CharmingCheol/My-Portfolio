import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { WritingRequestBody } from "types/writing";

import WritingsApi from "./writings";
import { apiOptions } from "./index";

const mockFactory = {
  get: jest.fn((entity) => entity),
  post: jest.fn((entity) => entity),
  patch: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
};

describe("WritingsApi", () => {
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
      expect(mockFactory.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiResponse: DeepPartial<AxiosResponse> = { data: new WritingFixture(), status: OK };
      mockFactory.get.mockReturnValue(apiResponse);
      const actual = await writingsApi.findOne(id);
      expect(actual).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.get.mockRejectedValue(apiError);
      const actual = await writingsApi.findOne(id);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("pagination", () => {
    const page = 1;

    it("API 호출 시 page 파라미터가 쿼리스트링으로 추가 된다", async () => {
      await writingsApi.pagination(page);
      expect(mockFactory.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, { params: { page } });
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const writings = WritingFixture.generateList(10);
      const apiResponse: DeepPartial<AxiosResponse> = { data: writings, status: OK };
      mockFactory.get.mockReturnValue(apiResponse);
      const actual = await writingsApi.pagination(page);
      expect(actual).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.get.mockRejectedValue(apiError);
      const actual = await writingsApi.pagination(page);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("create", () => {
    const body: WritingRequestBody = { title: "title", content: "content" };

    it("API 호출 시 body로 전달 할 데이터도 같이 전달 된다", async () => {
      await writingsApi.create(body);
      expect(mockFactory.post).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiResponse: DeepPartial<AxiosResponse> = { data: new WritingFixture(body), status: OK };
      mockFactory.post.mockReturnValue(apiResponse);
      const actual = await writingsApi.create(body);
      expect(actual).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.post.mockRejectedValue(apiError);
      const actual = await writingsApi.create(body);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("update", () => {
    const body: WritingRequestBody = { title: "title", content: "content" };
    const id = "id";

    it("API 호출 시 body와 id도 같이 전달 된다", async () => {
      await writingsApi.update(body, id);
      expect(mockFactory.patch).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiResponse: DeepPartial<AxiosResponse> = { data: new WritingFixture(body), status: OK };
      mockFactory.patch.mockReturnValue(apiResponse);
      const actual = await writingsApi.update(body, id);
      expect(actual).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.patch.mockRejectedValue(apiError);
      const actual = await writingsApi.update(body, id);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("delete", () => {
    const id = "id";

    it("API 호출 시 id가 URL에 포함 된다", async () => {
      await writingsApi.delete(id);
      expect(mockFactory.delete).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiResponse: DeepPartial<AxiosResponse> = { data: null, status: OK };
      mockFactory.delete.mockReturnValue(apiResponse);
      const actual = await writingsApi.delete(id);
      expect(actual).toStrictEqual(apiResponse);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockFactory.delete.mockRejectedValue(apiError);
      const actual = await writingsApi.delete(id);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });
});
