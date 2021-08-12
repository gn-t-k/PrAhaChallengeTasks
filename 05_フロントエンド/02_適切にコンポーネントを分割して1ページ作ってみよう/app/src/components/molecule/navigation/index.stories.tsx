import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangeColorLink from "components/atom/change-color-link";
import Navigation from "components/molecule/navigation";

export default {
  title: "Molecule/Navigation",
  componet: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const Default = Template.bind({});
const args = [
  {
    id: "aaa",
    text: "Home",
    href: "#",
  },
  {
    id: "aaa",
    text: "Blog",
    href: "#",
  },
  {
    id: "aaa",
    text: "About us",
    href: "#",
  },
];
Default.args = {
  children: args.map((arg) => [
    arg.id,
    <ChangeColorLink key={arg.id} text={arg.text} href={arg.href} />,
  ]),
};
