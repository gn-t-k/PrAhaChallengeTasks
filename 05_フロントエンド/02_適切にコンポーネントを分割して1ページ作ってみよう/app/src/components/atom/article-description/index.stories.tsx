import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArticleDescription from "components/atom/article-description";

export default {
  title: "Atom/ArticleDescription",
  componet: ArticleDescription,
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
} as ComponentMeta<typeof ArticleDescription>;

const Template: ComponentStory<typeof ArticleDescription> = (args) => (
  <ArticleDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
};
