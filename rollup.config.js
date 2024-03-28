import typescript from '@rollup/plugin-typescript';
import * as tf from '@tensorflow/tfjs';
import * as tfToxicity from '@tensorflow-models/toxicity';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'sjs',
      exports:'default',
      globals: {
        '@tensorflow/tfjs': 'tf',
        '@tensorflow-models/toxicity': 'tfToxicity'
      },
      sourcemap: true,
    }
  ],
  external: ['@tensorflow/tfjs', '@tensorflow-models/toxicity'],
  plugins: [typescript({ sourceMap: true, tsconfig: './tsconfig.json' })]
};