import {nodeResolve} from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import dev from 'rollup-plugin-dev';
import {babel} from '@rollup/plugin-babel';
import ts from 'rollup-plugin-ts';

export default {
  input: 'index.js',
  output: {
    sourcemap: true,
    dir: 'dist',
    entryFileNames: 'app-[hash].js',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      plugins: [
        ['@babel/plugin-proposal-decorators', {
          version: '2022-03',
        }],
      ],
    }),
    ts({
      transpiler: 'babel',
    }),
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
    dev({
      port: 3000,
      dirs: ['dist'],
      proxy: [{from: '/api', to: 'http://localhost:3001'}],
    }),
    livereload(),

  ],
};
