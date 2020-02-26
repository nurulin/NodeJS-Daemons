const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: {
        "src/wrapper": `${__dirname}/src/wrapper.js`,
        "src/init": `${__dirname}/src/init`,
        "src/daemon/index": `${__dirname}/src/daemon/`,
        "src/daemon": `${__dirname}/src/daemon.ts`
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(js)?$/,
                use: [{ loader: "babel-loader" }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: `${__dirname}/src/config.js`,
                to: "./src",
                flatten: false
            }
        ]),
        new RemovePlugin({
            before: {
                include: [
                    "dist"
                ]
            }
        })
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    target: "node",
    /* externals: [
        nodeExternals()
    ], */
    resolve: { extensions: [".ts", ".js"] },
    output: {
        filename: "[name].js",
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "dist")
    }
};
