/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Square, Props } from './square';
import '../../index.css';

export default {
  title: 'Square',
  component: Square,
} as Meta;

const Template: Story<Props> = ({ value, onClick, isGameEnd }) => (
  <Square {...{ value, onClick, isGameEnd }} />
);

const onClick = () => console.log('onClick');

export const Default = Template.bind({});
Default.args = {
  value: null,
  onClick,
  isGameEnd: false,
};

export const X = Template.bind({});
X.args = {
  value: 'X',
  onClick,
  isGameEnd: false,
};

export const O = Template.bind({});
O.args = {
  value: 'O',
  onClick,
  isGameEnd: false,
};
