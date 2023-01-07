import axios, { AxiosResponse } from "axios";
import { INTERNAL_SERVER_ERROR } from "http-status";

async function receiveApiRequest<T>(api: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
  try {
    const response = await api;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    if (axios.isCancel(error)) {
      return getAxiosResponse({ status: 499, statusText: "Client Closed Request" });
    }
    return getAxiosResponse({ status: INTERNAL_SERVER_ERROR, statusText: "Unexpected Error" });
  }
}

function getAxiosResponse(response: Partial<AxiosResponse>): AxiosResponse {
  return { data: undefined, status: 0, statusText: "", headers: undefined, config: {}, ...response };
}

export default receiveApiRequest;
