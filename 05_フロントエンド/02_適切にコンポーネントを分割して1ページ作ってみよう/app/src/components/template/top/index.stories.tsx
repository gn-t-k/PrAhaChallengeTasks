import { ComponentMeta, ComponentStory } from "@storybook/react";
import Top from "components/template/top";

export default {
  title: "Template/Top",
  componet: Top,
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
} as ComponentMeta<typeof Top>;

const Template: ComponentStory<typeof Top> = (args) => <Top {...args} />;

export const Default = Template.bind({});
Default.args = {};
