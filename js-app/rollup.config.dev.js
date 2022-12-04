import {nodeResolve} from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import dev from 'rollup-plugin-dev';

export default {
  input: 'src/index.js',
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
    copy({
      targets: [
        {src: 'static', dest: 'dist'},
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
