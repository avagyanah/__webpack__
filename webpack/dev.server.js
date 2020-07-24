const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev')();
const port = require('minimist')(process.argv.slice(2)).port || 3000;

try {
    const server = new WebpackDevServer(webpack(devConfig), {
        port,
        watchOptions: { aggregateTimeout: 0 },
        stats: { all: false, errors: true, colors: true },
        clientLogLevel: 'error',
    });
    server.listen(port, '0.0.0.0');
} catch (err) {
    console.error(err);
}
