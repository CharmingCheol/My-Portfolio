import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();
const { DECRYPT_KEY } = process.env;

export function encrypt(value: string) {
  const ciphertext = CryptoJS.AES.encrypt(value, DECRYPT_KEY as string);
  return ciphertext;
}

export function decrypt(CipherParams: CryptoJS.lib.CipherParams) {
  const bytes = CryptoJS.AES.decrypt(CipherParams, DECRYPT_KEY as string);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
