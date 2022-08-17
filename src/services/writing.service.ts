import { AxiosError } from "axios";
import { BAD_REQUEST, UNAVAILABLE_FOR_LEGAL_REASONS } from "http-status";

import { WritingsApi } from "api/writings";
import { Writing, WritingRequestBody } from "types/writing";

export interface WritingsService {
  createWriting(data: WritingRequestBody): Promise<Writing | AxiosError<Writing> | undefined>;
}

class BaseWritingsService implements WritingsService {
  constructor(private writingsApi: WritingsApi) {}

  async createWriting(data: WritingRequestBody) {
    try {
      const { title, content } = this.trimWritingRequest(data);
      if (!title || !content) {
        return;
      }
      const response = await this.writingsApi.create({ title, content });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<Writing>;
      if (!axiosError.response) {
        return axiosError;
      }
      const status = axiosError.response.status;
      if (BAD_REQUEST <= status && status <= UNAVAILABLE_FOR_LEGAL_REASONS) {
        return axiosError;
      }
    }
  }

  private trimWritingRequest(data: WritingRequestBody) {
    const title = data.title.trim();
    const content = data.content.trim();
    return { title, content };
  }
}

export default BaseWritingsService;
