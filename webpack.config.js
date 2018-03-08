const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/example.tsx',
    output: {
        filename: 'asynchro.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        contentBase: 'dist',
        hot: true,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './examples/index.ejs',
            filename: 'index.html'
        })
    ]
};