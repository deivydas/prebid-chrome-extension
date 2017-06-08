const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.noDeprecation = true;
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',    
        query: {
          presets: [
            ['es2015', {
              'modules': false,
            }],
          ],
        },
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /(node_modules|build)/,
        use: 'eslint-loader',    
      },
    ],
  },
  entry: {
    'app/scripts/app':'./src/app.js',
    'app/scripts/content-script':'./src/content-script.js',
    'app/scripts/inject':'./src/inject.js',
  },
  output: {
    filename: './[name].js',
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin({
      filename: './app/styles/app.css',
    }),
  ],
};