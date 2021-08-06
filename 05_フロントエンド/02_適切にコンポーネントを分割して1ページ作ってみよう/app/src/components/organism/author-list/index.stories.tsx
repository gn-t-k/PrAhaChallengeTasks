import { ComponentMeta, ComponentStory } from "@storybook/react";
import AuthorList from "components/organism/author-list";

export default {
  title: "Organism/AuthorList",
  componet: AuthorList,
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
} as ComponentMeta<typeof AuthorList>;

const Template: ComponentStory<typeof AuthorList> = (args) => (
  <AuthorList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  authorList: [
    {
      authorName: "Alex John",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
      authorPostsAmount: 23,
    },
    {
      authorName: "Jane Doe",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
      authorPostsAmount: 52,
    },
  ],
};
