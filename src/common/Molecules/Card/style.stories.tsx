import React from "react";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react/types-6-0";
import { text } from "@storybook/addon-knobs";
import { CardProps, ImageCard } from "./index";

export default {
  title: "molecules/Card",
  component: ImageCard,
  args: {
    createdAt: "2021.02.08",
    image:
      "https://images.unsplash.com/photo-1612738802443-c1291951687b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  },
} as Meta;

const DefaultTemplate: Story<CardProps> = (args) => {
  const body = text("body", "dfdsfsiodfoisdhfohsdfohsdoifhosdi");
  const category = text("category", "React");
  const title = text("title", "React의 기본기");
  return (
    <>
      <Layout>
        <ImageCard {...args} body={body} category={category} title={title} />
        <ImageCard {...args} body={body} category={category} title={title} />
        <ImageCard {...args} body={body} category={category} title={title} />
        <ImageCard {...args} body={body} category={category} title={title} />
        <ImageCard {...args} body={body} category={category} title={title} />
      </Layout>
    </>
  );
};

// 기본 Card
export const ImageCards = DefaultTemplate.bind({});

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
`;
