import { AxiosError } from "axios";
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
      const typedError = error as AxiosError<Writing>;
      if (!typedError.response) {
        return typedError;
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
