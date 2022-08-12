import { WritingsApi } from "api/writings";
import { WritingRequestBody } from "types/writing";

export interface WritingsService {
  createWriting(data: WritingRequestBody): void;
}

class WritingsServiceImpl implements WritingsService {
  constructor(private writingsApi: WritingsApi) {}

  createWriting = (data: WritingRequestBody) => {
    const title = data.title.trim();
    const content = data.content.trim();

    if (!title || !content) {
      return;
    }
    return {};
  };
}

export default WritingsServiceImpl;
