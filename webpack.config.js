const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const node_modules = path.resolve(__dirname, "./node_modules");
const src = path.resolve(__dirname, "./src");
const dist = path.resolve(__dirname, "dist");

module.exports = (env, options) => ({
    entry: "./src/index.ts",
    devtool: "source-map",
    optimization: { usedExports: true },
    output: {
        path: dist,
        filename: "[name].[contenthash].js"
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        hot: true
    },
    resolve: {
        modules: [src, node_modules],
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: {
                loader: "ts-loader"
            }
        }, {
            test: /\.s[ac]ss$/,
            use: [
                options.mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource"
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({ template: "index.html" }),
        new CopyPlugin({
            patterns: [{
                from: "CNAME",
                to: "./"
            }]
        })
    ]
});
