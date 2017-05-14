const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'asynchro.js',
        path: path.resolve(--dirname, 'dist')
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
    }
};