const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./scripts/config');

const webpackConfig = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[hash].js',
    publicPath: baseConfig.assetsPublicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        }
      },
      {
        test: /\.(css|less)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\/node_modules\/zepto\/dist\/zepto\.js$/,
        loader: "imports-loader?this=>window"
      },
      {
        test: /\.png$/,
        use: 'url-loader?limit=8192&mimetype=image/png'
      },
      {
        test: /\.jpe?g$/,
        use: 'url-loader?limit=8192&mimetype=image/jpg'
      },
      {
        test: /\.gif$/,
        use: 'url-loader?limit=8192&mimetype=image/gif'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=8192&mimetype=image/svg+xml'
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/v1': 'http://172.16.1.1:8080',
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    https: false,
    noInfo: false,
    port: 8088
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      hash: process.env.NODE_ENV === 'production'
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]);
}

module.exports = webpackConfig;