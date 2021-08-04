import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleHeading from "components/atom/article-heading";

export default {
  title: "Atom/ArticleHeading",
  componet: ArticleHeading,
  argTypes: {
    text: {
      name: "text",
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof ArticleHeading>;

const Template: ComponentStory<typeof ArticleHeading> = (args) => (
  <ArticleHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Build Your New Idea with Laravel Freamwork.",
  href: "#",
};
