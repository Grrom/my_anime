
const path = require("path")
const base = require("./webpack.base")
const { merge } = require("webpack-merge")

module.exports = merge(base, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build")
    }
})