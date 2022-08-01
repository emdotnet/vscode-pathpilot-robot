import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const path = require('node:path');

export default defineConfig({
    input: path.join(__dirname, 'src/extension.ts'),
    output: {
        dir: path.join(__dirname, 'dist'),
        format: 'cjs',
        sourcemap: true
    },
    watch: {
        include: './src/**',
        clearScreen: false
    },
    external: [
        'vscode'
    ],
    plugins: [
        nodeResolve({preferBuiltins : false}),
        json(),
        typescript(),
        //commonjs(),
        terser({
            compress: {
                module: true,
                toplevel: true,
                passes: 2
            }
        })
    ],
});
