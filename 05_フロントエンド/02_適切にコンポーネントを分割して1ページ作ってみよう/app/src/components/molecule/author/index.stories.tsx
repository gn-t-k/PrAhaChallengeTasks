import { ComponentMeta, ComponentStory } from "@storybook/react";
import Author from "components/molecule/author";

export default {
  title: "Molecule/Author",
  componet: Author,
} as ComponentMeta<typeof Author>;

const Template: ComponentStory<typeof Author> = (args) => <Author {...args} />;

export const Default = Template.bind({});
Default.args = {
  authorName: "Alex John",
  thumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
  authorPostsAmount: 23,
};
