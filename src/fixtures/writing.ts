import { Writing, WritingRequestBody } from "types/writing";

export const createWritingFixture = (args: Partial<Writing> = {}): Writing => {
  const defaultWriting: Writing = { createdAt: new Date().toString(), id: "", content: "", title: "" };
  return { ...defaultWriting, ...args };
};

export const createWritingFixtureList = (count: number, args: Partial<Writing> = {}): Writing[] =>
  Array(count)
    .fill(null)
    .map(() => createWritingFixture(args));

export const createWritingBody = (args: Partial<Writing>): WritingRequestBody => {
  const defaultData: WritingRequestBody = { content: args.content || "", title: args.title || "" };
  return { ...defaultData };
};
