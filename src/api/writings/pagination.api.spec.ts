import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { HttpMethod } from "types/api";

import PaginationWritingsApi from "./pagination.api";

const mockHttpMethod = {
  get: jest.fn((entity) => entity),
};

describe("PaginationWritingsApi", () => {
  const page = 1;
  let paginationWritingsApi: PaginationWritingsApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    paginationWritingsApi = new PaginationWritingsApi(httpMethod);
  });

  it("API 호출 시 page 파라미터가 쿼리스트링으로 추가 된다", async () => {
    await paginationWritingsApi.request(page);
    expect(mockHttpMethod.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, { params: { page } });
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const writingList = WritingFixture.generateList(10);
    const apiSuccess: DeepPartial<AxiosResponse> = { data: writingList, status: OK };
    mockHttpMethod.get.mockReturnValue(apiSuccess);
    const actual = await paginationWritingsApi.request(page);
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.get.mockRejectedValue(apiError);
    const actual = await paginationWritingsApi.request(page);
    expect(actual.status).toBe(BAD_REQUEST);
  });
});
