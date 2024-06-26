import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import * as tf from '@tensorflow/tfjs';
import * as tfToxicity from '@tensorflow-models/toxicity';

import pkg from './package.json' assert { type: "json" };

export default {
    input: './src/index.ts',
    output: [{
        file: pkg.exports.import,
        sourcemap: true,
        format: 'esm',
    },
    {
        file: pkg.exports.require,
        sourcemap: true,
        format: 'cjs',
    },],
    external: ['@tensorflow/tfjs', '@tensorflow-models/toxicity', '@tensorflow/tfjs-backend-webgl', '@tensorflow/tfjs-backend-wasm'],
    plugins: [
        typescript({ sourceMap: true, tsconfig: './tsconfig.json' }),
        peerDepsExternal(),
        commonjs(),
        resolve()
    ],
    watch: {
        include: 'src/**',
    }
};