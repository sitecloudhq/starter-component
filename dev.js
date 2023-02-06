const fs = require('fs');
const rollup = require('rollup');
const chalk = require('chalk');
const onExit = require('signal-exit');
const { WebSocketServer } = require('ws');
const rollupConfig = require('./rollup.config');
const pkg = require('./package.json');

const env = process.env.NODE_ENV || 'development';

let watcher;

const removeOnExit = onExit(close);

function close() {
  removeOnExit();
  process.removeListener('uncaughtException', close);
  watcher.close();
}

const wss = new WebSocketServer({ port: 43200 });

function start() {
  console.log(chalk.yellow(`Starting dev server for ${pkg.name}`));
  wss.on('listening', () => {
    console.log('Waiting for connection');
  });
  wss.on('connection', (ws) => {
    watcher = rollup.watch(rollupConfig);
    console.log('Client connected');
    watcher.on('event', ({ code, output, error, result }) => {
      switch (code) {
        case 'FATAL':
          console.error(chalk.red(error));
          process.exit();
          break;
        case 'ERROR':
          console.error(chalk.red(error));
          break;
        case 'BUNDLE_START':
          console.log(chalk.green('Building...'));
          break;
        case 'BUNDLE_END':
          let data = fs.readFileSync(output[0], { encoding: 'ascii' });
          ws.send(JSON.stringify({ lib: pkg.name, data }));
          console.log(chalk.green('Done'));
          break;
      }
    });
    ws.on('close', () => {
      console.log(chalk.green('Client disconnected'));
      watcher.close();
    });
  });
  process.on('uncaughtException', close);
}

start();
