const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  watch: true,
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'index.js',
    chunkFilename: '[name].build.js',
  },
  devServer: {
    inline: true,
    port: 8080,
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src'),
      Components: path.resolve(__dirname, 'src/components'),
      Assets: path.resolve(__dirname, 'src/assets'),
      Style: path.resolve(__dirname, 'src/style'),
      react: path.resolve('./node_modules/react'),
      Redux: path.resolve(__dirname, 'src/redux'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Constants: path.resolve(__dirname, 'src/constants')

    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.sass']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ]
};
