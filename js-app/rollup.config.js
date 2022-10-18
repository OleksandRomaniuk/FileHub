import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import hashedMapping from '@trendyminds/rollup-plugin-hashed-mapping';

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    entryFileNames: '[name]-[hash].js',
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    },
  },
  plugins: [
    nodeResolve(),
    terser(),
    htmlTemplate({
      template: 'index.html',
      target: 'dist/index.html',
    }),
    hashedMapping(),
    copy({
      targets: [
        {src: 'css', dest: 'dist'},
        {src: 'images', dest: 'dist'},
        {src: 'fonts', dest: 'dist'},
      ],
    }),
    serve({
      open: true,
      port: 3000,
      contentBase: 'dist',
    }),
    livereload(),

  ],
};
