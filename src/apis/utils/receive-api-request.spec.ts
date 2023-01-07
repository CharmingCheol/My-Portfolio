import { AxiosError } from "axios";
import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";
import receiveApiRequest from "./receive-api-request";

describe("receive-api-request", () => {
  it("api 응답이 성공 할 경우 AxiosResponse를 반환 한다", async () => {
    const api = Promise.resolve({ data: { foo: "bar" }, status: OK, statusText: "", headers: {}, config: {} });
    const response = await receiveApiRequest(api);
    expect(response.data).toStrictEqual({ foo: "bar" });
    expect(response.status).toBe(OK);
  });

  it("api 응답 실패 시 response가 있는 경우 AxiosResponse를 반환 한다", async () => {
    const error: AxiosError = {
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
      name: "",
      message: "",
      response: { data: {}, status: BAD_REQUEST, statusText: "", headers: {}, config: {} },
    };
    const api = Promise.reject(error);
    const response = await receiveApiRequest(api);
    expect(response.status).toBe(BAD_REQUEST);
  });

  it("클라이언트가 요청을 중단한 경우 499 status를 반환 한다", async () => {
    const api = Promise.reject({ __CANCEL__: "__CANCEL__" });
    const resposne = await receiveApiRequest(api);
    expect(resposne?.status).toBe(499);
  });

  it("알 수 없는 api Error인 경우 500 status를 반환 한다", async () => {
    const api = Promise.reject(new Error(""));
    const response = await receiveApiRequest(api);
    expect(response?.status).toBe(INTERNAL_SERVER_ERROR);
  });
});
