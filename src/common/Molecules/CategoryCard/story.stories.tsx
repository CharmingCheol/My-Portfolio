import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta, Story } from "@storybook/react/types-6-0";
import { text } from "@storybook/addon-knobs";
import CategoryCard, { CategoryCardProps } from "./index";

export default {
  title: "molecules/CategoryCard",
  component: CategoryCard,
} as Meta;

const Template: Story<CategoryCardProps> = () => {
  return (
    <MemoryRouter>
      <CategoryCard
        category="React"
        date={text("date", "2021-02-21")}
        id="12eq3r23tw"
        title={text("title", "sdfsdfj")}
      />
    </MemoryRouter>
  );
};

// 기본 CategoryCard
export const DefaultCategoryCard = Template.bind({});
