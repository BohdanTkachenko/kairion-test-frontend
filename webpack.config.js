/* eslint no-var:0, vars-on-top: 0, max-len: 0, prefer-template: 0 */

require('babel-polyfill');

var PROD = process.env.NODE_ENV === 'production';
var DEV = !PROD;

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var strip = require('strip-loader');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SplitByPathPlugin = require('webpack-split-by-path');

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = JSON.parse(babelrc);

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment);
delete babelLoaderQuery.env;

if (DEV) {
  babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
  var reactTransform = null;
  for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
      reactTransform = plugin;
    }
  }

  if (!reactTransform) {
    reactTransform = ['react-transform', { transforms: [] }];
    babelLoaderQuery.plugins.push(reactTransform);
  }

  if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
  }

  // make sure react-transform-hmr is enabled
  reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  });
}

var relativeAssetsPath = './dist';
var assetsPath = path.resolve(__dirname, relativeAssetsPath);

var webpackConfig = {
  context: path.resolve(__dirname, '.'),
  entry: ['./src/app.js'],
  output: {
    path: assetsPath,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: PROD
          ? [strip.loader('debug'), 'babel']
          : ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
      },
      {
        test: /\.css$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style', [
              'css?importLoaders=2&sourceMap',
              'autoprefixer-loader?browsers=last 2 version',
            ].join('!'))
          : [
              'style',
              'css?importLoaders=2&sourceMap',
              'autoprefixer-loader?browsers=last 2 version',
            ].join('!')
      },
      {
        test: /\.less$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style', [
              'css?importLoaders=2&sourceMap',
              'autoprefixer-loader?browsers=last 2 version',
              'less?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
            ].join('!'))
          : [
              'style',
              'css?importLoaders=2&sourceMap',
              'autoprefixer-loader?browsers=last 2 version',
              'less?outputStyle=expanded&sourceMap',
            ].join('!')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|gif|jpeg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devServer: {
    port: 3000,
    contentBase: assetsPath,
    outputPath: assetsPath,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9000',
        pathRewrite: { '^/api': '' },
      }
    }
  }
};

if (DEV) {
  webpackConfig.output.publicPath = 'http://localhost:' + webpackConfig.devServer.port + '/';
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
  ];
} else {
  webpackConfig.plugins = [
    new CleanPlugin([relativeAssetsPath]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ];
}

webpackConfig.plugins.unshift(new webpack.DefinePlugin({
  'process.env': {
    // Useful to reduce the size of client-side libraries, e.g. react
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  }
}));

webpackConfig.plugins.unshift(new HtmlWebpackPlugin({
  title: 'Test',
  template: './src/index.ejs',
  inject: 'body'
}));

webpackConfig.plugins.unshift(new webpack.ProvidePlugin({
  React: 'react'
}));

webpackConfig.plugins.unshift(new SplitByPathPlugin([
  {
    name: 'vendor',
    path: path.join(__dirname, 'node_modules')
  },
  {
    name: 'styles',
    path: path.resolve(__dirname, 'src', 'styles'),
  },
]));

module.exports = webpackConfig;
