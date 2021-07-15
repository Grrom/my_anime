
const path = require("path")
const base = require("./webpack.base")
const { merge } = require("webpack-merge")

module.exports = merge(base, {
    mode: "production",
    output: {
        filename: "main-[contenthash].js",
        path: path.resolve(__dirname, "build")
    }
})