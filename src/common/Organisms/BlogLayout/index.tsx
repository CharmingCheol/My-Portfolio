import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import Category from "@common/Organisms/Category";
import Header from "@common/Organisms/Header";
import { getCategorys } from "@apis/categorys";
import { encrypt } from "@utils/modules/encryption";
import { CategoryList } from "@typings/db";

const BlogLayout = () => {
  const location = useLocation();
  const [printComponent, setPrintComponent] = useState(false);
  const [encryptedIP, setEncryptedIP] = useState<CryptoJS.lib.CipherParams | null>(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  // 특정 URL인 경우 헤더와 카테고리 비활성화
  // 특정 URL이 아닌 경우 카테고리 리스트 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const disabledURL = ["/", "/profile", "/project", "/blog/write/post"];
        if (disabledURL.includes(location.pathname)) return setPrintComponent(false);
        const { data }: { data: CategoryList[] } = await getCategorys();
        const extractCategory = data.map(({ category }) => category);
        setPrintComponent(true);
        setCategoryList(extractCategory);
      } catch {
        setPrintComponent(false);
        setEncryptedIP(null);
      }
    };
    callback();
  }, [location]);

  // IP 정보 불러오기
  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { ip } = await fetch("https://api.ipify.org/?format=json").then((res) => res.json());
        const ciphertext = encrypt(ip as string);
        setEncryptedIP(ciphertext);
      } catch {
        setEncryptedIP(null);
      }
    };
    callback();
  }, []);

  return (
    <>
      {printComponent && (
        <>
          <Header ip={encryptedIP} />
          <Category categoryList={categoryList} ip={encryptedIP} />
        </>
      )}
    </>
  );
};

export default BlogLayout;
