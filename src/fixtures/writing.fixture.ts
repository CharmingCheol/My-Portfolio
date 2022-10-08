import { Writing } from "types/writing";

export const createWritingFixture = (args: Partial<Writing> = {}): Writing => {
  const defaultWriting: Writing = { createdAt: new Date().toString(), id: "", content: "", title: "" };
  return { ...defaultWriting, ...args };
};

export const createWritingFixtureList = (count: number, args: Partial<Writing> = {}): Writing[] =>
  Array(count)
    .fill(null)
    .map(() => createWritingFixture(args));
