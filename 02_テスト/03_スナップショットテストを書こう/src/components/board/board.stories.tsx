/* eslint-disable no-console */
import { Story, Meta } from '@storybook/react/types-6-0';
import { Board, Props } from './board';
import '../../index.css';

export default {
  title: 'Board',
  component: Board,
} as Meta;

const Template: Story<Props> = ({
  status,
  changeStatus,
  isGameEnd = false,
}) => <Board {...{ status, changeStatus, isGameEnd }} />;

const changeStatus = () => console.log('Change status.');

export const Default = Template.bind({});
Default.args = {
  status: Array(9).fill(null),
  changeStatus,
};

export const fillX = Template.bind({});
fillX.args = {
  status: Array(9).fill('半'),
  changeStatus,
};

export const fillO = Template.bind({});
fillO.args = {
  status: Array(9).fill('丁'),
  changeStatus,
};

export const fillTryangle = Template.bind({});
fillTryangle.args = {
  status: Array(9).fill('△'),
  changeStatus,
};
