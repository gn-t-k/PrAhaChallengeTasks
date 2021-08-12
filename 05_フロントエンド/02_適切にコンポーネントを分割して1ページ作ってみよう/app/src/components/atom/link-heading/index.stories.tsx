import { ComponentMeta, ComponentStory } from "@storybook/react";
import LinkHeading from "components/atom/link-heading";

export default {
  title: "Atom/LinkHeading",
  componet: LinkHeading,
} as ComponentMeta<typeof LinkHeading>;

const Template: ComponentStory<typeof LinkHeading> = (args) => (
  <LinkHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Brand",
  href: "#",
};
