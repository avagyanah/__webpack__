const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const getCommonConfig = require('./webpack.common.js');

module.exports = () => {
    return merge(getCommonConfig(), {
        stats: 'errors-only',

        plugins: [new ScriptExtHtmlWebpackPlugin({ inline: /\.js$/ })],

        module: {
            rules: [
                {
                    test: /\.(jpe?g|png)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[path][name].[ext]',
                                fallback: require.resolve('base64-inline-loader'),
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: false,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 75,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|mp3)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[path][name].[ext]',
                                fallback: require.resolve('base64-inline-loader'),
                            },
                        },
                    ],
                },
            ],
        },

        // optimization: {
        // minimizer: [
        //     new TerserPlugin({
        //         extractComments: false,
        //         parallel: true,
        //         terserOptions: {
        //             compress: {
        //                 drop_console: true,
        //             },
        //             output: {
        //                 comments: false,
        //             },
        //         },
        //     }),
        // ],
        // },
    });
};
