import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangeColorLink from "components/atom/change-color-link";

export default {
  title: "Atom/ChangeColorLink",
  componet: ChangeColorLink,
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
} as ComponentMeta<typeof ChangeColorLink>;

const Template: ComponentStory<typeof ChangeColorLink> = (args) => (
  <ChangeColorLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Home",
  href: "#",
};
