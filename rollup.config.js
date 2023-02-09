const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const typescript = require('@rollup/plugin-typescript');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');

const pkg = require('./package.json');

const input = './src/index.js';
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

const external_namespace = 'WebsketchExt';

module.exports = {
  input,
  onwarn: function(message, next) {
    console.error(message);
    process.exit(-1);
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    external(),
    nodeResolve(),
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
