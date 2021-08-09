import { ComponentMeta, ComponentStory } from "@storybook/react";
import AuthorName from "components/atom/author-name";

export default {
  title: "Atom/AuthorName",
  componet: AuthorName,
} as ComponentMeta<typeof AuthorName>;

const Template: ComponentStory<typeof AuthorName> = (args) => (
  <AuthorName {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Alex John",
};
