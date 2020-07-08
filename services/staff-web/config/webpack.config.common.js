import "dotenv/config";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import stringify from "stringify-object-values";
import global from "./webpack.global";
import paths from "./webpack.const";

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: {
          loader: "ts-loader",
        },
        include: paths.srcDir,
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|JPG)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[name].[ext]",
            outputPath: "static/assets/images",
            publicPath: "static/assets/images",
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|ttc)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: `[name].[ext]`,
            outputPath: "static/assets/fonts",
            publicPath: "static/assets/fonts",
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/assets/svg",
            publicPath: "static/assets/svg",
          },
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: global.isDev,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(stringify(global.variables)),
    new webpack.HashedModuleIdsPlugin(),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@app/api": paths.apiDir,
      "@app/image": paths.imageDir,
      "@app/modules": paths.modulesDir,
      "@app/shared": paths.sharedDir,
      "@app/components": paths.componentsDir,
      "@app/const": paths.constDir,
      "@app/dump": paths.dumpDir,
      "@app/layout": paths.layoutDir,
      "@app/pages": paths.pagesDir,
      "@app/routes": paths.routesDir,
      bigCalendarStyle: path.join(
        __dirname,
        "node_modules/react-big-calendar/lib/css/react-big-calendar.css"
      ),
      dayPickerStyle: path.join(
        __dirname,
        "node_modules/react-day-picker/lib/style.css"
      ),
    },
  },
};

export default commonConfig;
