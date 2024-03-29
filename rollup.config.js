import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import * as tf from '@tensorflow/tfjs';
import * as tfToxicity from '@tensorflow-models/toxicity';

import pkg from './package.json' assert { type: "json" };

const minifiedOutputs = [
    {
        file: pkg.exports['.'].import,
        format: 'esm',
    },
    {
        file: pkg.exports['.'].require,
        format: 'cjs',
    },
];
const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
    ...rest,
    file: file.replace('.min.', '.'),
}));

export default {
    input: './src/index.ts',
    output: [...unminifiedOutputs, ...minifiedOutputs],
    external: ['@tensorflow/tfjs', '@tensorflow-models/toxicity'],
    plugins: [
        typescript({ sourceMap: true, tsconfig: './tsconfig.json' }),
        peerDepsExternal(),
        commonjs(),
        resolve(),
        terser()
    ],
    watch: {
        include: 'src/**',
    }
};