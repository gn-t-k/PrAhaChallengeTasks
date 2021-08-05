import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleAuthor from "components/molecule/article-author";

export default {
  title: "Molecule/ArticleAuthor",
  componet: ArticleAuthor,
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
} as ComponentMeta<typeof ArticleAuthor>;

const Template: ComponentStory<typeof ArticleAuthor> = (args) => (
  <ArticleAuthor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  authorName: "Alex John",
  authorHref: "#",
  thumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
};
