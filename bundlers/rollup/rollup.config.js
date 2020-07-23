import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import multi from '@rollup/plugin-multi-entry';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';

// import url from '@rollup/plugin-url';

// prettier-ignore
const PATHS = {
  // html:           path.resolve(path.join('html', 'index.hbs')),
  promise:        path.resolve(path.join('libs/promise-polyfill', 'index.js')),
  pixi:           path.resolve(path.join('libs/pixi-legacy', 'index.js')),
  pixiTween:      path.resolve(path.join('libs/pixi-tween', 'index.js')),
  pixiSound:      path.resolve(path.join('libs/pixi-sound', 'index.js')),
  pixiSpine:      path.resolve(path.join('libs/pixi-spine', 'index.js')),
  pixiParticles:  path.resolve(path.join('libs/pixi-particles', 'index.js')),
  pixiStats:      path.resolve(path.join('libs/pixi-stats', 'index.js')),
  index:          path.resolve(path.join('src', 'index.js')),
  dist:           path.resolve(path.join('dist', 'bundle.js')),

};

export default {
    input: {
        include: [
            PATHS.promise,
            PATHS.pixi,
            PATHS.pixiTween,
            PATHS.pixiSound,
            PATHS.pixiSpine,
            PATHS.pixiParticles,
            PATHS.pixiStats,
            PATHS.index,
        ],
        exclude: [],
    },

    context: 'null',
    output: {
        file: PATHS.dist,
        format: 'cjs',
    },

    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
        }),
        nodeResolve({
            preferBuiltins: false,
        }),
        commonjs(),
        multi(),
        image(),
        // url({
        //     fileName: '[name][hash][extname]',
        //     include: ['**/*.mp3'],
        //     // include: ['**/*.png', '**/*.jpg'],
        //     limit: 0,
        // }),
        del({ targets: 'dist/*' }),
        terser(),
    ],
};
