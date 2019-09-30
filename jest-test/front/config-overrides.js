// react-app-rewiredの設定ファイル
// babelについてはreact-app-rewiredがbabelrcを自動で読み込むためここでの設定は不要

const { injectBabelPlugin } = require('react-app-rewired');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: function (config) {
    config = injectBabelPlugin(
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
      config,
    );
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new CSSSplitWebpackPlugin({
        filename: 'static/css/[name]-[part].[ext]',
        size: 4000,
      }),
    );

    config.plugins.push(
      new CompressionPlugin({
        include: [/\.js(\?.*)?$/i, /\.css(\?.*)?$/i],
        filename(info) {
          // info.file is the original asset filename
          // info.path is the path of the original asset
          // info.query is the query
          const shredArray = info.file.split('.');
          shredArray.splice(shredArray.length - 1, 0, 'gz');
          const fileNameAfterGzip = shredArray.join('.');
          console.log(fileNameAfterGzip);
          return fileNameAfterGzip;
        },
      }),
    );

    return config;
  },
  jest: function (config) {
    if (process.env.CI) {
      config.coverageReporters = ['text', 'cobertura'];
      config.setupTestFrameworkScriptFile = '<rootDir>/src/setupTests.js';
    }
    return config;
  },
};
