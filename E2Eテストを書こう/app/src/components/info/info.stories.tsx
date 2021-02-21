/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Info, Props } from './info';
import '../../index.css';

export default {
  title: 'Info',
  component: Info,
} as Meta;

const Template: Story<Props> = ({
  history,
  changeHistory,
  isXNext = true,
  winner = null,
  isGameEnd = false,
}) => (
  <Info
    {...{
      history,
      changeHistory,
      isXNext,
      winner,
      isGameEnd,
    }}
  />
);

const changeHistory = () => console.log('Change history.');

export const Default = Template.bind({});
Default.args = {
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['O', null, null, null, null, null, null, null, null],
  ],
  changeHistory,
};

export const OWin = Template.bind({});
OWin.args = {
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['O', null, null, null, null, null, null, null, null],
    ['O', 'X', null, null, null, null, null, null, null],
    ['O', 'X', null, 'O', null, null, null, null, null],
    ['O', 'X', null, 'O', 'X', null, null, null, null],
    ['O', 'X', null, 'O', 'X', null, 'O', null, null],
  ],
  changeHistory,
  winner: 'O',
  isGameEnd: true,
};

export const Draw = Template.bind({});
Draw.args = {
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['O', null, null, null, null, null, null, null, null],
    ['O', 'X', null, null, null, null, null, null, null],
    ['O', 'X', null, 'O', null, null, null, null, null],
    ['O', 'X', null, 'O', null, null, 'X', null, null],
    ['O', 'X', null, 'O', 'O', null, 'X', null, null],
    ['O', 'X', null, 'O', 'O', null, 'X', null, 'X'],
    ['O', 'X', null, 'O', 'O', null, 'X', 'O', 'X'],
    ['O', 'X', null, 'O', 'O', 'X', 'X', 'O', 'X'],
    ['O', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'],
  ],
  changeHistory,
  winner: null,
  isGameEnd: true,
};
