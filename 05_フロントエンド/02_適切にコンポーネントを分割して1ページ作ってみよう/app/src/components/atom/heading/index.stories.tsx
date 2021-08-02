import { ComponentMeta, ComponentStory } from "@storybook/react";
import Heading from "components/atom/heading";

export default {
  title: "Atom/Heading",
  componet: Heading,
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
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "title text",
};
