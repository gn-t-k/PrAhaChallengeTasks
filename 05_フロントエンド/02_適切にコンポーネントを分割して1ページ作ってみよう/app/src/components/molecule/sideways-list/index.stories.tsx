import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangeColorLink from "components/atom/change-color-link";
import SidewaysList from "components/molecule/sideways-list";

export default {
  title: "Atom/SidewaysList",
  componet: SidewaysList,
} as ComponentMeta<typeof SidewaysList>;

const Template: ComponentStory<typeof SidewaysList> = (args) => (
  <SidewaysList {...args} />
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
