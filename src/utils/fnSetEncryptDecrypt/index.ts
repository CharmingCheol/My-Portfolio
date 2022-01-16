import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

export const encrypt = (message: string) => {
  const secrectKey = process.env.SECRECT_KEY as string;
  return CryptoJS.AES.encrypt(message, secrectKey).toString();
};

export const decrypt = (ciphertext: string) => {
  const secrectKey = process.env.SECRECT_KEY as string;
  const bytes = CryptoJS.AES.decrypt(ciphertext, secrectKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
