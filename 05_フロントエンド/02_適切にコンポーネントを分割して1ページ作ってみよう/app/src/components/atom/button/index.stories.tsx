/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button, { Props } from "components/atom/button";

export default {
  title: "Atom/Button",
  componet: Button,
} as ComponentMeta<typeof Button>;

export const Apply: ComponentStory<typeof Button> = () => {
  const args: Props = {
    color: "blue",
    size: "medium",
    disabled: false,
    onClick: () => {
      console.log("apply");
    },
  };

  return <Button {...args}>応募する</Button>;
};

export const Delete: ComponentStory<typeof Button> = () => {
  const args: Props = {
    color: "red",
    size: "small",
    disabled: false,
    onClick: () => {
      console.log("delete");
    },
  };

  return <Button {...args}>削除する</Button>;
};

export const DisabledDelete: ComponentStory<typeof Button> = () => {
  const args: Props = {
    color: "red",
    size: "small",
    disabled: true,
    onClick: () => {
      console.log("delete");
    },
  };

  return <Button {...args}>削除する</Button>;
};
