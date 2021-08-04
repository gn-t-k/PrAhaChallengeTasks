import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleReadMore from "components/atom/article-read-more";

export default {
  title: "Atom/ArticleReadMore",
  componet: ArticleReadMore,
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
} as ComponentMeta<typeof ArticleReadMore>;

const Template: ComponentStory<typeof ArticleReadMore> = (args) => (
  <ArticleReadMore {...args} />
);

export const Default = Template.bind({});
Default.args = {
  href: "#",
};
