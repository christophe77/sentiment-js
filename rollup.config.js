import typescript from '@rollup/plugin-typescript';
import * as tf from '@tensorflow/tfjs';
import * as tfToxicity from '@tensorflow-models/toxicity';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    globals: {
      '@tensorflow/tfjs': 'tf',
      '@tensorflow-models/toxicity' : 'tfToxicity'
    },
    sourcemap : true,
  },
  external: ['@tensorflow/tfjs', '@tensorflow-models/toxicity'],
  plugins: [typescript()]
};