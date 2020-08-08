const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev')();
const port = require('../scripts/utils').getProcessArg('port');

try {
    const server = new WebpackDevServer(webpack(devConfig), {
        port,
        watchOptions: { aggregateTimeout: 0 },
        stats: { all: false, errors: true, colors: true },
        clientLogLevel: 'error',
    });
    server.listen(port);
} catch (err) {
    console.error(err);
}
