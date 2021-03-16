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
  status: ['半', null, '丁', '半', '半', null, null, '丁', '丁'],
  changeStatus,
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['半', null, null, null, null, null, null, null, null],
    ['半', null, '丁', null, null, null, null, null, null],
    ['半', null, '丁', '半', null, null, null, null, null],
    ['半', null, '丁', '半', null, null, null, null, '丁'],
    ['半', null, '丁', '半', '半', null, null, null, '丁'],
    ['半', null, '丁', '半', '半', null, null, '丁', '丁'],
  ],
  changeHistory,
};

export const XWin = Template.bind({});
XWin.args = {
  status: ['半', null, '丁', '半', '半', null, '半', '丁', '丁'],
  changeStatus,
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['半', null, null, null, null, null, null, null, null],
    ['半', null, '丁', null, null, null, null, null, null],
    ['半', null, '丁', '半', null, null, null, null, null],
    ['半', null, '丁', '半', null, null, null, null, '丁'],
    ['半', null, '丁', '半', '半', null, null, null, '丁'],
    ['半', null, '丁', '半', '半', null, null, '丁', '丁'],
    ['半', null, '丁', '半', '半', null, '半', '丁', '丁'],
  ],
  changeHistory,
};

export const Draw = Template.bind({});
Draw.args = {
  status: ['丁', '半', '丁', '丁', '丁', '半', '半', '丁', '半'],
  changeStatus,
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['丁', null, null, null, null, null, null, null, null],
    ['丁', '半', null, null, null, null, null, null, null],
    ['丁', '半', null, '丁', null, null, null, null, null],
    ['丁', '半', null, '丁', null, null, '半', null, null],
    ['丁', '半', null, '丁', '丁', null, '半', null, null],
    ['丁', '半', null, '丁', '丁', null, '半', null, '半'],
    ['丁', '半', null, '丁', '丁', null, '半', '丁', '半'],
    ['丁', '半', null, '丁', '丁', '半', '半', '丁', '半'],
    ['丁', '半', '丁', '丁', '丁', '半', '半', '丁', '半'],
  ],
  changeHistory,
};
