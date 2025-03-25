const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
};