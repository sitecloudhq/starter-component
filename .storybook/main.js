const path = require('path');
module.exports = {
  stories: ['../src/stories/**/*.stories.js'],

  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '..')
    ];
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  core: {
    builder: 'webpack5'
  }
};
