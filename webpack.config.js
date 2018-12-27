const path = require("path");
// const webpack = require("webpack");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports = {
  mode: "development",

  context: path.resolve(__dirname),

  // This has to be source-map as webexts cannot eval due to CSP
  devtool:
    process.env.NODE_ENV === "production" || process.env.NOMAP === "1"
      ? "none"
      : "inline-source-map",

  target: "web",

  entry: {
    vendor: "./vendor/index.ts",
    background: "./src/background/index.ts",
    content: "./src/content/index.ts",
    options: "./src/options/index.tsx"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundles/[name].js"
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src"),
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true, url: false }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|mp4|webm|mp3|ogg|svg)$/,
        loader: "file-loader",
        options: {
          name: "./assets/[name].[ext]"
        }
      },
      {
        test: /\.(html|css)$/,
        loader: "file-loader",
        options: {
          name: "./assets/[name].[ext]"
        }
      },
      {
        test: /vendor\/.*\.js$/,
        loader: "file-loader",
        options: {
          name: "./vendor/[name].[ext]"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /\/(node_modules|vendor)\//,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
          ],
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /\/node_modules\//,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
          ],
          presets: ["@babel/env", "@babel/typescript", "@babel/react"]
        }
      }
    ]
  },

  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["yarn --silent tsc:check:no-error --pretty"],
      dev: false
    })
  ],

  optimization: {
    minimize: false,
    splitChunks: false
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      "@background": path.resolve(__dirname, "src", "background"),
      "@content": path.resolve(__dirname, "src", "content"),
      "@options": path.resolve(__dirname, "src", "options"),
      "@src": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "test"),
      "@vendor": path.resolve(__dirname, "vendor")
    }
  }
};
