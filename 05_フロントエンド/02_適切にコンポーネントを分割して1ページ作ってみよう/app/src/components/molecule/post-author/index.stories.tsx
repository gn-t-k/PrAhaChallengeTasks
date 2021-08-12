import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostAuthor from "components/molecule/post-author";

export default {
  title: "Molecule/PostAuthor",
  componet: PostAuthor,
} as ComponentMeta<typeof PostAuthor>;

const Template: ComponentStory<typeof PostAuthor> = (args) => (
  <PostAuthor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  authorName: "Alex John",
  authorHref: "#",
  thumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
};
