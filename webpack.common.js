const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('Copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin('./dist'),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/public'), to: "public" }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)|(bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production' ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(jpg|jped|png|gif|svg|eot|ttf|woff|ico|otf|webp|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
};