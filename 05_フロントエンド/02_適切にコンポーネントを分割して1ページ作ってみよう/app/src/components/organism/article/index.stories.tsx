import { ComponentMeta, ComponentStory } from "@storybook/react";
import Article from "components/organism/article";

export default {
  title: "Organism/Article",
  componet: Article,
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
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (args) => (
  <Article {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: new Date(),
  tagLabel: "Laravel",
  tagHref: "#",
  title: "Build Your New Idea with Laravel Freamwork.",
  href: "#",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
  authorName: "Alex John",
  authorHref: "#",
  thumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
};
