import CryptoJS from "crypto-js";

export const encrypt = (message: string) => {
  const secrectKey = process.env.SECRECT_KEY as string;
  return CryptoJS.AES.encrypt(message, secrectKey).toString();
};

export const decrypt = (ciphertext: string) => {
  const secrectKey = process.env.SECRECT_KEY as string;
  const bytes = CryptoJS.AES.decrypt(ciphertext, secrectKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
