const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

// prettier-ignore
const PATHS = {
    html:           path.resolve('html/index.hbs'),
    promise:        path.resolve('libs/promise-polyfill/index.js'),
    pixi:           path.resolve('libs/pixi-legacy/index.js'),
    pixiTween:      path.resolve('libs/pixi-tween/index.js'),
    pixiSound:      path.resolve('libs/pixi-sound/index.js'),
    pixiSpine:      path.resolve('libs/pixi-spine/index.js'),
    pixiParticles:  path.resolve('libs/pixi-particles/index.js'),
    pixiStats:      path.resolve(path.join('libs/pixi-stats', 'index.js')),
    index:          path.resolve('src/index.js'),
    dist:           path.resolve('dist'),
};

module.exports = () => {
    return {
        // prettier-ignore
        entry: {
            promise:    PATHS.promise,
            pixi:       PATHS.pixi,
            tween:      PATHS.pixiTween,
            sound:      PATHS.pixiSound,
            spine:      PATHS.pixiSpine,
            particles:  PATHS.pixiParticles,
            pixiStats:  PATHS.pixiStats,
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
    };
};
