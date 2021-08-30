import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWriting } from "apis";
import useApiRequest from "hooks/useApiRequest";
import NotFound from "pages/NotFound";
import Date from "components/atoms/Date";
import { Writing } from "types/writing";

const WritingPage = () => {
  const location = useLocation();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [getWritingApi, apiDispatch] = useApiRequest<Writing>(getWriting);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (getWritingApi.type === "REQUEST") return;
    switch (getWritingApi.type) {
      case "SUCCESS": {
        if (getWritingApi.responseData) {
          setWriting(getWritingApi.responseData);
        }
        break;
      }
      case "FAILURE": {
        setIsNotFound(true);
        break;
      }
      default: {
        const spliting = location.pathname.split("/");
        const id = spliting[spliting.length - 1];
        apiDispatch({
          type: "REQUEST",
          requestData: { params: { id } },
        });
        break;
      }
    }
  }, [apiDispatch, getWritingApi.responseData, getWritingApi.type, location.pathname]);

  if (isNotFound) return <NotFound />;

  return (
    <main>
      <h1>{writing?.title}</h1>
      <Date date={writing?.createdAt || ""} endPoint="T" replaceText={{ from: "-", to: "." }} />
      <img src={writing?.thumbnail} alt="thumbnail" />
      <p>{writing?.body}</p>
    </main>
  );
};

export default WritingPage;
