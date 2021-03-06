import React from 'react';

import { action } from '@storybook/addon-actions';
import Starter from '../src/starter';

export default {
  title: 'Starter',
  component: Starter
};

export const example = () => (
  <Starter color="blue">This is a custom component</Starter>
);

example.story = {
  name: 'default'
};
