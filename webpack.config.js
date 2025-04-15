const path = require('path');
const webpack = require('webpack');

const PugPlugin = require('pug-plugin');

module.exports = {
    mode: 'development',
    bail: false,
    watchOptions: { ignored: /node_modules/ },
    devtool: 'eval-source-map', // 'inline-source-map'
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
            publicPath: "./"
        },
        hot: true,
        port: 3000,
        host: '0.0.0.0',
        open: false,
    },


    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'docs'), // we use the docs folder, since github pages offers to import files only from root or docs/
        clean: true
    },
    plugins: [
        new PugPlugin({
            entry: { index: 'src/views/index.pug' },
            js: { inline: true },
            css: { inline: true },
            method: 'render',
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false, // prevents styling bug when input "type=text" is removed
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                // removeAttributeQuotes: true
                // minifyCSS: true,
                minifyJS: true,
            }
        })
    ],
    // resolve: {
    //     extensions: [".ts", ".js"],
    //     modules: [
    //         'node_modules',
    //     ]
    // },
    module: {
        rules: [{
            test: /\.pug$/,
            loader: PugPlugin.loader,
            options: {
                filters: {
                    'my-own-filter': function (text, options) {
                        if (options.addStart) text = 'Start\n' + text;
                        if (options.addEnd) text = text + '\nEnd';
                        return text;
                    }
                }
            },
        },
            // {
            //     test: /\.(js|ts)$/,
            //     loader: "babel-loader",
            //     exclude: /(node_modules|bower_components)/,
            //     options: {
            //         compact: true,
            //         "presets": [
            //             ["@babel/preset-env", { "modules": false }],
            //             "@babel/preset-typescript",
            //         ]
            //     }
            // }, {
            //     test: /\.(s?css|sass)$/,
            //     use: ['css-loader', 'sass-loader'],
            // }, {
            //     test: /\.md$/,
            //     // use: [path.resolve(__dirname, 'loaders/MarkdownToHtml.js')]
            //     use: ['raw-loader']
            // }, {
            //     test: /\.(woff2?|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            //     generator: { filename: '[name][ext]', },
            // }, {
            //     include: path.resolve(__dirname, 'src/static/favicon/'),
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'favicons/[name][ext]',
            //     },
            // }, {
            //     include: path.resolve(__dirname, 'src/static/img/'),
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'img/[name][ext]',
            //     },
            // }
        ],
    },
}