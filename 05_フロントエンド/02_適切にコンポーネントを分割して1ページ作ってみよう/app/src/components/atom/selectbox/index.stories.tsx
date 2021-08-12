import { ComponentMeta, ComponentStory } from "@storybook/react";
import Selectbox from "components/atom/selectbox";

export default {
  title: "Atom/Selectbox",
  componet: Selectbox,
} as ComponentMeta<typeof Selectbox>;

const Template: ComponentStory<typeof Selectbox> = (args) => (
  <Selectbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: ["Latest", "LastWeek"],
};
