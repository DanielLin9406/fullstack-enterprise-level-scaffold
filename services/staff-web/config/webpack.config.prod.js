import { merge } from "webpack-merge";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import commonConfig from "./webpack.config.common";
import paths from "./webpack.const";

const publicConfig = {
  mode: "production",
  entry: {
    index: [paths.appJs],
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "redux",
      "react-router-dom",
      "lodash",
    ],
  },
  output: {
    path: paths.buildDir,
    publicPath: "/",
    filename: "static/js/[name].[chunkhash].js",
    chunkFilename: "static/js/[name].[chunkhash].js",
  },
  optimization: {
    minimizer: [new UglifyJSPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[name].[hash].css",
      allChunks: false,
    }),
    new WebpackAssetsManifest(),
  ],
};

export default merge(commonConfig, publicConfig);
