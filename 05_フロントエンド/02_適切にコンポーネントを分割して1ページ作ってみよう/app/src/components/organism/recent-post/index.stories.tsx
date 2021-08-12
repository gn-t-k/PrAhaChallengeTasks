import { ComponentMeta, ComponentStory } from "@storybook/react";
import RecentPost from "components/organism/recent-post";

export default {
  title: "Organism/RecentPost",
  componet: RecentPost,
} as ComponentMeta<typeof RecentPost>;

const Template: ComponentStory<typeof RecentPost> = (args) => (
  <RecentPost {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tagHref: "#",
  tagText: "Laravel",
  postHref: "#",
  postTitle: "Build Your Name Idea with Laravel Freamwork",
  authorName: "Alex John",
  authorHref: "#",
  authorThumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
  postDate: new Date(),
};
