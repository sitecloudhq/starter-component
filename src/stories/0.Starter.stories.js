import React from 'react';
import { action } from '@storybook/addon-actions';
import Starter from '../Starter';

export default {
  title: 'Starter',
  component: Starter
};

export const example = () => <Starter color="blue" />;

example.story = {
  name: 'default'
};
