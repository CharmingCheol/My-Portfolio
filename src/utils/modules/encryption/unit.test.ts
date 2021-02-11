import { encrypt, decrypt } from "./index";

describe("utils/modules/encryption", () => {
  it("원본 텍스트와 복호화 테스트가 일치한다", () => {
    const encryptResult = encrypt("000.000.000.000");
    const result = decrypt(encryptResult);
    expect(result).toBe("000.000.000.000");
  });
});
