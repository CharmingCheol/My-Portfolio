import React from "react";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react";
import ContentCard, { Props } from "./index";

export default {
  title: "molecules/Card/ContentCard",
  component: ContentCard,
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DefaultContentCardTemplate: Story<Props> = (props) => {
  return (
    <MemoryRouter>
      <Wrapper>
        <ContentCard {...props} />
        <ContentCard {...props} />
        <ContentCard {...props} />
        <ContentCard {...props} />
      </Wrapper>
    </MemoryRouter>
  );
};
export const DefaultContentCard = DefaultContentCardTemplate.bind({});
DefaultContentCard.args = {
  body: "bodybodybodybody",
  createdAt: "2021-08-02T10:55:51.603Z",
  id: 1,
  title: "titletitletitle",
};

const FlexibleContentCardTemplate: Story<Props> = (props) => {
  return (
    <MemoryRouter>
      <Wrapper>
        <ContentCard {...props} />
        <ContentCard createdAt="2021-08-08T" title="title" body="body" id={1} />
      </Wrapper>
    </MemoryRouter>
  );
};
export const FlexibleContentCard = FlexibleContentCardTemplate.bind({});
FlexibleContentCard.args = {
  body: "bodybodybodybody",
  createdAt: "2021-08-02T10:55:51.603Z",
  id: 1,
  title: "titletitletitle",
};
