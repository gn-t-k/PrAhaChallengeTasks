import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "components/organism/header";

export default {
  title: "Atom/Header",
  componet: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
const args = {
  title: {
    text: "Brand",
    href: "#",
  },
  navigationItemList: [
    {
      text: "Home",
      href: "#",
    },
    {
      text: "Blog",
      href: "#",
    },
    {
      text: "About us",
      href: "#",
    },
  ],
};
Default.args = {
  title: args.title,
  navigationItemList: args.navigationItemList,
};
