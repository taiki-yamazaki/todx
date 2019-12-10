const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    context: path.resolve(__dirname, "./src"),
    entry: {
      example: "./ts/index.ts"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].bundle.js",
      library: "[name]"
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './static',
          to: './'
        },
      ])
    ]
  }
];
