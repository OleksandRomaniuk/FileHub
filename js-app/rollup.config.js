import {nodeResolve} from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    sourcemap: true,
    dir: 'dist',
    entryFileNames: 'app-[hash].js',
  },
  plugins: [
    nodeResolve(),
    htmlTemplate({
      template: 'index.html',
      target: 'dist/index.html',
    }),
    terser(),
    copy({
      targets: [
        {src: 'css', dest: 'dist'},
        {src: 'images', dest: 'dist'},
        {src: 'fonts', dest: 'dist'},
      ],
    }),
  ],
};
