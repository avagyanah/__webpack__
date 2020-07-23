const ManifestPlugin = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const getCommonConfig = require('./webpack.common.js');

module.exports = () => {
    return merge(getCommonConfig(), {
        mode: 'development',

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
    });
};
