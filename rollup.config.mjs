import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const config = {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs'
    },
    plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        typescript(),
        babel({ babelHelpers: 'bundled' }),
    ]
  };
  
  export default config;