import { useLayoutEffect, useState } from "react";
import { decrypt } from "@utils/modules/encryption";
import CryptoJS from "crypto-js";

const { MY_IP } = process.env;

const useDecryptIP = (encryptIP: CryptoJS.lib.CipherParams) => {
  const [sameIp, setSameIp] = useState(false);

  useLayoutEffect(() => {
    try {
      const originalText = decrypt(encryptIP);
      if (MY_IP === originalText) setSameIp(true);
    } catch {
      setSameIp(false);
    }
  }, [encryptIP]);

  return sameIp;
};

export default useDecryptIP;
