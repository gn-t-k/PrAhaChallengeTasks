import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostDescription from "components/atom/post-description";

export default {
  title: "Atom/PostDescription",
  componet: PostDescription,
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
} as ComponentMeta<typeof PostDescription>;

const Template: ComponentStory<typeof PostDescription> = (args) => (
  <PostDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
};
