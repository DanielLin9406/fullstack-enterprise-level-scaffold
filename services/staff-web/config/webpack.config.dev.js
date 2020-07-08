import { merge } from "webpack-merge";
import path from "path";
import commonConfig from "./webpack.config.common";

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    index: ["react-hot-loader/patch", path.join(__dirname, "../src/index.tsx")],
  },
  output: {
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
          },
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
  },
};

export default merge(commonConfig, devConfig);
