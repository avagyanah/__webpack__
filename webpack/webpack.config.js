const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// prettier-ignore
const PATHS = {
    html:           path.resolve(path.join('html', 'index.hbs')),
    promise:        path.resolve(path.join('libs/promise-polyfill', 'index.js')),
    pixi:           path.resolve(path.join('libs/pixi-legacy', 'index.js')),
    pixiTween:      path.resolve(path.join('libs/pixi-tween', 'index.js')),
    pixiSound:      path.resolve(path.join('libs/pixi-sound', 'index.js')),
    pixiSpine:      path.resolve(path.join('libs/pixi-spine', 'index.js')),
    pixiParticles:  path.resolve(path.join('libs/pixi-particles', 'index.js')),
    pixiStats:      path.resolve(path.join('libs/pixi-stats', 'index.js')),
    index:          path.resolve(path.join('src', 'index.js')),
    dist:           path.resolve(path.join('dist')),
};

// __COMMON CONFIG__
const getCommonConfig = (mode) => {
    return {
        // prettier-ignore
        entry: {
            promise:    PATHS.promise,
            pixi:       PATHS.pixi,
            tween:      PATHS.pixiTween,
            sound:      PATHS.pixiSound,
            spine:      PATHS.pixiSpine,
            particles:  PATHS.pixiParticles,
            stats:      PATHS.pixiStats,
            index:      PATHS.index,
        },

        output: {
            path: PATHS.dist,
            filename: '[name].[contenthash].js',
        },

        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader',
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                    exclude: '/node_modules/',
                },
                {
                    test: /\.(scss)$/i,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                    ],
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Webpack Pixi Demo',
                template: PATHS.html,
            }),
        ],

        mode: mode,
    };
};

// __PRODUCTION CONFIG__
const productionConfig = {
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

    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

// __DEVELOPMENT CONFIG__
const developmentConfig = {
    stats: 'detailed',

    devtool: 'inline-cheap-source-map',

    plugins: [new ManifestPlugin()],

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|woff|mp3)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};

// __MERGE__
module.exports = (env) => {
    switch (env) {
        case 'development':
            return merge(getCommonConfig(env), developmentConfig);
        case 'production':
            return merge(getCommonConfig(env), productionConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
};
