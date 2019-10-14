const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.noDeprecation = true;
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },'css-loader', 'sass-loader'],
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',
      },
      {
        test: /\.js?$/,
        enforce: 'pre',
        exclude: /(node_modules|build)/,
        use: 'eslint-loader',    
      },
    ],
  },
  mode: 'development',
  entry: {
    'scripts/app':'./src/app.js',
    'scripts/content-script':'./src/content-script.js',
    'scripts/inject':'./src/inject.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app'),
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/app.css',
    }),
  ],
};