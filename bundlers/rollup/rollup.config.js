const path = require('path');

export default {
  input: path.resolve(path.join('src', 'index.js')),
  output: {
    inlineDynamicImports: true,
    file: path.resolve(path.join('dist/bundle.js')),
    format: 'cjs',
  },
};
