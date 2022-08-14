// const webpackConfigPath = './webpack.config.prod.js';
const webpackConfig = require('./webpack.config.prod.js');

const override = (config) => {
  config.output.publicPath = '/static/';

  return config;
};
// require.cache[require.resolve(webpackConfigPath)].exports = (env) => override(webpackConfig(env));

module.exports = override(webpackConfig);
