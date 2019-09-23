import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-html';
import image from 'rollup-plugin-image';
import json from 'rollup-plugin-json';
import livereload from 'rollup-plugin-livereload'
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import typeScript from 'rollup-plugin-typescript2';

const getPlugins = (options) => [
    builtins(),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      exclude: 'node_modules/process-es6/**',
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    babel({
      presets: [[options.target, { modules: false }], 'react'],
      exclude: 'node_modules/**' // only transpile our source code
    }),
    replace({
      'process.env.NODE_ENV': '"production"',
    }),
    html(),
    image(),
    json(),
    postcss({
      extensions: ['.css']
    }),
    serve({
      open: true,
      contentBase: ['dist', '../static']
    }),
    livereload({
      watch: 'dist'
    }),
    typeScript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: { compilerOptions: { 'target': options.target } }
    }),
];

export default {
    input: './src/index.tsx',
    output: {
        file: './dist/index.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: getPlugins({
      target: 'es3',
      useTsconfigDeclarationDir: true
    })
}
