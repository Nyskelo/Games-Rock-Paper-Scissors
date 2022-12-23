const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
 entry: {
    app: path.resolve(__dirname, 'js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  resolve: {
    extensions: ['.js', '.scss', '.png'],
    alias: {
      '@sass': path.resolve(__dirname, 'scss'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@': path.resolve(__dirname)
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false}),
      new CssMinimizerPlugin()
    ]
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|jpg|gif|webp)$/i,
        type: 'asset/resource',
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.5, 0.7],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          webp: {
            quality: 75
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ESLintPlugin()
  ]
};
