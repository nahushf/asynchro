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
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve (__dirname, 'src')
        ],
        extensions: ['.tsx', '.ts', '.js']
    }
};