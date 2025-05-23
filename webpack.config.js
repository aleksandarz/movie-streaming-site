const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            os: false,
            crypto: false
        },
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    plugins: [
        new Dotenv()
    ]
};