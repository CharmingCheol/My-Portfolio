import React from "react";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import { ComponentMeta } from "@storybook/react";

import ContentCard from "./index";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Template: React.FunctionComponent = ({ children }) => (
  <MemoryRouter>
    <Wrapper>{children}</Wrapper>
  </MemoryRouter>
);

export const DefaultTemplate = () => (
  <Template>
    {Array(4)
      .fill(0)
      .map((_, index) => (
        <ContentCard id={`${index}`} title="title" content="content" createdAt="2022-07-10T16:37:52.492500" />
      ))}
  </Template>
);

export const TextOverflowTemplate = () => (
  <Template>
    {Array(4)
      .fill(0)
      .map((_, index) => (
        <ContentCard
          id={`${index}`}
          title={Array(100).fill("title").join("")}
          content={Array(100).fill("content").join("")}
          createdAt="2022-07-10T16:37:52.492500"
        />
      ))}
  </Template>
);

export default {
  title: "molecules/Card/ContentCard",
  component: ContentCard,
} as ComponentMeta<typeof ContentCard>;
