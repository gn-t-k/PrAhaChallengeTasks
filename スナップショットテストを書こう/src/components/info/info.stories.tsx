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
    ['丁', null, null, null, null, null, null, null, null],
  ],
  changeHistory,
};

export const OWin = Template.bind({});
OWin.args = {
  history: [
    [null, null, null, null, null, null, null, null, null],
    ['丁', null, null, null, null, null, null, null, null],
    ['丁', '半', null, null, null, null, null, null, null],
    ['丁', '半', null, '丁', null, null, null, null, null],
    ['丁', '半', null, '丁', '半', null, null, null, null],
    ['丁', '半', null, '丁', '半', null, '丁', null, null],
  ],
  changeHistory,
  winner: '丁',
  isGameEnd: true,
};

export const Draw = Template.bind({});
Draw.args = {
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
  winner: null,
  isGameEnd: true,
};
