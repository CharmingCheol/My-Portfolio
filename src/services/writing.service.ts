import { WritingsApi } from "api/writings";
import { WritingRequestBody } from "types/writing";

export interface WritingsService {
  createWriting(data: WritingRequestBody): void;
}

class WritingsServiceImpl implements WritingsService {
  constructor(private writingsApi: WritingsApi) {}

  createWriting = (data: WritingRequestBody) => {
    const { title, content } = this.trimWritingRequest(data);
    if (!title || !content) {
      return;
    }
    return {};
  };

  private trimWritingRequest(data: WritingRequestBody) {
    const title = data.title.trim();
    const content = data.content.trim();
    return { title, content };
  }
}

export default WritingsServiceImpl;