const path = require('path');
module.exports = {
  stories: ['../src/stories/**/*.stories.js'],

  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '..')
    ];

    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      ]
    });

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

    return config;
  },
  core: {
    builder: 'webpack5'
  }
};
