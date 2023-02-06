const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');
const typescript = require('@rollup/plugin-typescript');

const pkg = require('./package.json');

const input = './src/index.js';
const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, '.min.js');

const external_namespace = 'WebsketchExt';

module.exports = {
  input,
  onwarn: function (message, next) {
    console.error(message);
    process.exit(-1);
  },
  plugins: [
    babel({
      //exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    external(),
    resolve(),
    commonjs(),
    typescript(),
    terser()
  ],
  output: [
    {
      file: pkg.module,
      format: 'umd',
      globals: {
        react: 'React',
        'styled-components': 'styled',
        'react-helmet': 'react-helmet'
      },
      name: `${external_namespace}.${pkg.name}`
    }
  ]
};
