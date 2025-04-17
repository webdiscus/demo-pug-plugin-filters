const path = require('path');
const webpack = require('webpack');

const PugPlugin = require('pug-plugin');
const { dir } = require('console');

module.exports = {
    mode: 'development',
    bail: false,
    watchOptions: { ignored: /node_modules/ },
    devtool: 'eval-source-map', // 'inline-source-map'
    // live reload
    devServer: {
        static: path.join(__dirname, 'docs'),
        watchFiles: {
          paths: ['src/**/*.*'],
          options: {
            usePolling: true,
          },
        },
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'docs'), // we use the docs folder, since github pages offers to import files only from root or docs/
        clean: true
    },
    plugins: [
        // Pug plugin is based on the https://webdiscus.github.io/html-bundler-webpack-plugin/
        new PugPlugin({
            // https://webdiscus.github.io/html-bundler-webpack-plugin/plugin-options-entry
            entry: { index: 'src/views/index.pug' },
            // https://webdiscus.github.io/html-bundler-webpack-plugin/plugin-options-js
            js: { inline: true },
            // https://webdiscus.github.io/html-bundler-webpack-plugin/plugin-options-css
            css: { inline: true },
            // https://webdiscus.github.io/html-bundler-webpack-plugin/plugin-options-minify
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
            },
            // Pug preprocessor options must be defined here (don't define any Pug loader in module.rules):
            // https://webdiscus.github.io/html-bundler-webpack-plugin/guides/preprocessor/pug
            preprocessorOptions: {
                // original Pug options: https://pugjs.org/language/filters.html
                filters: {
                    'my-own-filter': function (text, options) {
                        if (options.addStart) text = 'Start\n' + text;
                        if (options.addEnd) text = text + '\nEnd';
                        return text;
                    }
                },
                // built-in filters: https://webdiscus.github.io/pug-loader/pug-filters/index.html
                embedFilters: {
                    // enable `:markdown` filter for markdown
                    markdown: true,
                },
            },
            // watch chages in non standard files for live reload
            // https://webdiscus.github.io/html-bundler-webpack-plugin/plugin-options-watchFiles
            watchFiles: {
                paths: [
                    'src/markdown',
                ],
                includes: [/\.(md)$/],
            },
        })
    ],
    // resolve: {
    //     extensions: [".ts", ".js"],
    //     modules: [
    //         'node_modules',
    //     ]
    // },
    module: {
        rules: [
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
            // }, 
            {
                test: /\.(s?css|sass)$/,
                use: ['css-loader', 'sass-loader'],
            }, 
            // {
            //     test: /\.(woff2?|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            //     generator: { filename: '[name][ext]', },
            // },
            // {
            //     include: path.resolve(__dirname, 'src/static/favicon/'),
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'favicons/[name][ext]',
            //     },
            // },
            // {
            //     include: path.resolve(__dirname, 'src/static/img/'),
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'img/[name][ext]',
            //     },
            // }
        ],
    },
}