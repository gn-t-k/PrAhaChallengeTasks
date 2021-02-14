/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Game, Props } from './game';
import '../../index.css';

export default {
  title: 'Game',
  component: Game,
} as Meta;

const Template: Story<Props> = ({
  isXNext = true,
  status,
  changeStatus,
  history = [Array(9).fill(null)],
  changeHistory,
}) => <Game {...{ isXNext, status, changeStatus, history, changeHistory }} />;

const changeStatus = () => console.log('Change status.');
const changeHistory = () => console.log('Change history.');

export const Default = Template.bind({});
Default.args = {
  status: Array(9).fill(null),
  changeStatus,
  changeHistory,
};

export const InProgress = Template.bind({});
InProgress.args = {
  status: ['X', null, 'O', 'X', 'X', null, null, 'O', 'O'],
  changeStatus,
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['X', null, null, null, null, null, null, null, null],
    ['X', null, 'O', null, null, null, null, null, null],
    ['X', null, 'O', 'X', null, null, null, null, null],
    ['X', null, 'O', 'X', null, null, null, null, 'O'],
    ['X', null, 'O', 'X', 'X', null, null, null, 'O'],
    ['X', null, 'O', 'X', 'X', null, null, 'O', 'O'],
  ],
  changeHistory,
};

export const XWin = Template.bind({});
XWin.args = {
  status: ['X', null, 'O', 'X', 'X', null, 'X', 'O', 'O'],
  changeStatus,
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['X', null, null, null, null, null, null, null, null],
    ['X', null, 'O', null, null, null, null, null, null],
    ['X', null, 'O', 'X', null, null, null, null, null],
    ['X', null, 'O', 'X', null, null, null, null, 'O'],
    ['X', null, 'O', 'X', 'X', null, null, null, 'O'],
    ['X', null, 'O', 'X', 'X', null, null, 'O', 'O'],
    ['X', null, 'O', 'X', 'X', null, 'X', 'O', 'O'],
  ],
  changeHistory,
};

export const Draw = Template.bind({});
Draw.args = {
  status: ['O', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'],
  changeStatus,
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
};
