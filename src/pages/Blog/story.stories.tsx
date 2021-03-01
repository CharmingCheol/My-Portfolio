import React, { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react/types-6-0";
import MainCardList from "@components/Blog/MainCardList";
import LoadMoreButton from "@components/Blog/LoadMoreButton";
import { BoardDetail } from "@typings/db";
import cardListDummy from "./dummy.json";
import * as S from "./style";

export default {
  title: "pages/Blog",
} as Meta;

// Blog Page
const Template = () => {
  const [cardList, setCardList] = useState<BoardDetail[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setCardList(cardListDummy);
    }, 3000);
  }, []);

  return (
    <>
      <MemoryRouter>
        <S.Layout>
          <MainCardList cardList={cardList} />
          <LoadMoreButton postCount={cardList?.length || 0} onClick={() => {}} />
        </S.Layout>
      </MemoryRouter>
    </>
  );
};
export const BlogPage = Template.bind({});
