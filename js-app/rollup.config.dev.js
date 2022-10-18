import {nodeResolve} from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import hashedMapping from '@trendyminds/rollup-plugin-hashed-mapping';

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    entryFileNames: '[name]-[hash].js',
  },
  plugins: [
    nodeResolve(),
    htmlTemplate({
      template: 'index.html',
      target: 'dist/index.html',
    }),
    copy({
      targets: [
        {src: 'css', dest: 'dist'},
        {src: 'images', dest: 'dist'},
        {src: 'fonts', dest: 'dist'},
      ],
    }),
    hashedMapping(),
  ],
};
