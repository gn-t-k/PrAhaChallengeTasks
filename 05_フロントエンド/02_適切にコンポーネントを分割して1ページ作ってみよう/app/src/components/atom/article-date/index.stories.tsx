import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleDate from "components/atom/article-date";

export default {
  title: "Atom/ArticleDate",
  componet: ArticleDate,
} as ComponentMeta<typeof ArticleDate>;

const Template: ComponentStory<typeof ArticleDate> = (args) => (
  <ArticleDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: new Date(),
};
