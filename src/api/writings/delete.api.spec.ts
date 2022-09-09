import { AxiosError, AxiosResponse } from "axios";

import { API_URL } from "constants/api";
import { BAD_REQUEST, OK } from "http-status";
import { HttpMethod } from "types/api";

import DeleteApi from "./delete.api";

const mockHttpMethod = {
  delete: jest.fn((entity) => entity),
};

describe("DeleteApi", () => {
  const id = "id";
  let deleteApi: DeleteApi;

  beforeEach(() => {
    const httpMethod = (mockHttpMethod as unknown) as HttpMethod;
    deleteApi = new DeleteApi(httpMethod);
  });

  it("전달 된 id가 API 주소에 포함 된다", async () => {
    await deleteApi.request(id);
    expect(mockHttpMethod.delete).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
  });

  it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
    const apiSuccess: DeepPartial<AxiosResponse> = { data: null, status: OK };
    mockHttpMethod.delete.mockReturnValue(apiSuccess);
    const actual = await deleteApi.request(id);
    expect(actual).toStrictEqual(apiSuccess);
  });

  it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
    const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
    mockHttpMethod.delete.mockRejectedValue(apiError);
    const actual = await deleteApi.request(id);
    expect(actual.status).toBe(BAD_REQUEST);
  });
});
