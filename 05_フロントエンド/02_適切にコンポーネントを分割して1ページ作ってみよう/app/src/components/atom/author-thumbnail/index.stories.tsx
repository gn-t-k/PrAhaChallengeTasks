import { ComponentMeta, ComponentStory } from "@storybook/react";
import AuthorThumbnail from "components/atom/author-thumbnail";

export default {
  title: "Atom/AuthorThumbnail",
  componet: AuthorThumbnail,
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
} as ComponentMeta<typeof AuthorThumbnail>;

const Template: ComponentStory<typeof AuthorThumbnail> = (args) => (
  <AuthorThumbnail {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
  authorName: "Alex John",
};
