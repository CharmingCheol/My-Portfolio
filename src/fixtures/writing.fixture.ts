import { Writing } from "types/writing";

type WritingKey = keyof Writing;

class WritingFixture implements Writing {
  createdAt = new Date().toString();
  id = "";
  content = "";
  title = "";

  constructor(args: Partial<Writing> = {}) {
    const keys = (Object.keys(args) as unknown) as WritingKey[];
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = args[key] as any;
      }
    });
  }
}

export default WritingFixture;
