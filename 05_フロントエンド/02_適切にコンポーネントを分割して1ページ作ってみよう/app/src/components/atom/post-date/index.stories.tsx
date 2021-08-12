import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostDate from "components/atom/post-date";

export default {
  title: "Atom/PostDate",
  componet: PostDate,
} as ComponentMeta<typeof PostDate>;

const Template: ComponentStory<typeof PostDate> = (args) => (
  <PostDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: new Date(),
};
