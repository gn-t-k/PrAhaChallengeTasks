import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostReadMore from "components/atom/post-read-more";

export default {
  title: "Atom/PostReadMore",
  componet: PostReadMore,
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
} as ComponentMeta<typeof PostReadMore>;

const Template: ComponentStory<typeof PostReadMore> = (args) => (
  <PostReadMore {...args} />
);

export const Default = Template.bind({});
Default.args = {
  href: "#",
};
