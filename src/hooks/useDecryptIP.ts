import { useLayoutEffect, useState } from "react";
import { decrypt } from "@utils/modules/encryption";
import CryptoJS from "crypto-js";

interface UseDecryptIPParams {
  callback?: () => void;
  encryptIP: CryptoJS.lib.CipherParams;
}

const useDecryptIP = ({ callback, encryptIP }: UseDecryptIPParams) => {
  const [sameIp, setSameIp] = useState(false);

  useLayoutEffect(() => {
    try {
      if (!encryptIP) return setSameIp(false);
      const originalText = decrypt(encryptIP);
      if (process.env.MY_IP === originalText) setSameIp(true);
      if (callback) callback();
    } catch (error) {
      setSameIp(false);
    }
  }, [callback, encryptIP]);

  return sameIp;
};

export default useDecryptIP;
