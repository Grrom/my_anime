const path = require("path")
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build")
    }
}