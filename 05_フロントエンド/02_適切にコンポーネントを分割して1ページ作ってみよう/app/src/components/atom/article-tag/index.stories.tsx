import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleTag from "components/atom/article-tag";

export default {
  title: "Atom/ArticleTag",
  componet: ArticleTag,
} as ComponentMeta<typeof ArticleTag>;

const Template: ComponentStory<typeof ArticleTag> = (args) => (
  <ArticleTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Laravel",
  href: "#",
};
